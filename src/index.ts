import ky from "ky";
import { MessageType, TOKEN_URL, TokenResponse, UiMessageType } from "./shared";

const apiUrl = "https://api.spotify.com/v1";

const getClientId = () => {
  return localStorage.getItem("clientId") || "";
};

const sendMessage = (message: MessageType) => {
  application.postUiMessage(message);
};

const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem("access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
};

const http = ky.create({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const accessToken = await refreshToken();
          request.headers.set("Authorization", `Bearer ${accessToken}`);
          return http(request, options);
        }
      },
    ],
  },
});
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", getClientId());
    const result = await ky.post<TokenResponse>(TOKEN_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }).json();
    if (result.access_token && result.refresh_token) {
      setTokens(result.access_token, result.refresh_token);
      return result.access_token;
    }
  } catch {
    const token = localStorage.getItem("access_token");
    return token;
  }
};

function trackResultToSong(
  results: (SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified)[]
): Track[] {
  return results.map(
    (r): Track => ({
      albumApiId: "album" in r ? r.album.uri : undefined,
      apiId: r.uri,
      artistApiId: r.artists[0].uri,
      artistName: r.artists[0].name,
      addtionalArtists: r.artists.slice(1).map(
        (a): ArtistInfo => ({
          name: a.name,
          apiId: a.uri,
        })
      ),
      duration: r.duration_ms / 1000,
      images: "album" in r ? (r.album.images as ImageInfo[]) : [],
      name: r.name,
    })
  );
}

function artistResultToArtist(
  results: SpotifyApi.ArtistObjectFull[]
): Artist[] {
  return results.map(
    (r): Artist => ({
      apiId: r.uri,
      name: r.name,
      images: r.images as ImageInfo[],
    })
  );
}

function albumResultToAlbum(
  results: SpotifyApi.AlbumObjectSimplified[]
): Album[] {
  return results.map(
    (r): Album => ({
      apiId: r.uri,
      artistName: r.artists[0].name,
      artistApiId: r.artists[0].id,
      addtionalArtists: r.artists.slice(1).map(
        (a): ArtistInfo => ({
          name: a.name,
          apiId: a.id,
        })
      ),
      name: r.name,
      images: r.images as ImageInfo[],
    })
  );
}

class SpotifyPlayer {
  public name = "spotify";
  private deviceId: string;
  private interval: number | undefined;
  private previousState: Spotify.PlaybackState | null = null;
  private resolveReady: any;
  private readyPromise: Promise<void>;
  constructor() {
    this.deviceId = "";
    window.onSpotifyWebPlaybackSDKReady = this.initializePlayer.bind(this);
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
  }

  private initializePlayer = () => {
    const player = new window.Spotify.Player({
      getOAuthToken: async (cb: (arg0: string) => void) => {
        const accessToken = await refreshToken();
        if (accessToken) {
          cb(accessToken);
        }
      },
      name: "AudioGata Player",
    });
    // Error handling
    player.addListener("initialization_error", (error) => {
      console.error(error);
    });
    player.addListener("authentication_error", (error) => {
      console.error(error);
    });
    player.addListener("account_error", (error) => {
      console.error(error);
    });
    player.addListener("playback_error", (error) => {
      console.error(error);
    });
    // Playback status updates
    player.addListener("player_state_changed", async (state) => {
      if (state) {
        this.interval = setInterval(async () => {
          let state = await player.getCurrentState();
          if (state) {
            await application.setTrackTime(state.position / 1000);
          }
        }, 1000);

        if (
          state &&
          this.previousState &&
          !this.previousState.paused &&
          state.paused &&
          state.position === 0
        ) {
          this.previousState = state;
          if (this.interval) {
            clearInterval(this.interval);
          }
          // Create small delay or else may have 502 errors
          setTimeout(application.endTrack, 100);
        }
        this.previousState = state;
      } else {
        if (this.interval) {
          clearInterval(this.interval);
        }
      }
    });
    // Ready
    player.addListener("ready", ({ device_id }: { device_id: string }) => {
      console.log("Ready with Device ID", device_id);
      this.deviceId = device_id;
      this.resolveReady(undefined);
    });
    // Not Ready
    player.addListener("not_ready", ({ device_id }: { device_id: string }) => {
      console.log("Device ID has gone offline", device_id);
    });
    // Connect to the player!
    player.connect();
  };

  public loadScript() {
    const script = document.createElement("script");
    script.id = "spotify-player";
    script.type = "text/javascript";
    script.async = false;
    script.defer = true;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.head.appendChild(script);
  }

  public async play(song: PlayTrackRequest) {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(), 5000);
    });
    await Promise.race([this.readyPromise, timeoutPromise]);

    if (!this.deviceId) {
      return;
    }
    const url = `${apiUrl}/me/player/play?device_id=${this.deviceId}`;

    const trackId = song.apiId || "";
    await http.put(
      url,
      {
        json: {
          uris: [trackId],
          position_ms: (song.seekTime ?? 0) * 1000,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
  }

  public async pause() {
    if (!this.deviceId) {
      return;
    }

    if (this.previousState && !this.previousState.paused) {
      await http.put(`https://api.spotify.com/v1/me/player/pause`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  public async resume() {
    if (!this.deviceId) {
      return;
    }

    await http.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  public async seek(timeInSeconds: number) {
    if (!this.deviceId) {
      return;
    }

    await http.put(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${
        timeInSeconds * 1000
      }&device_id=${this.deviceId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  public async setVolume(volume: number) {
    await http.put(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${Math.round(
        volume * 100
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

async function searchAll(request: SearchRequest): Promise<SearchAllResult> {
  const url = `${apiUrl}/search?q=${encodeURIComponent(
    request.query
  )}&type=album,artist,track`;
  const data = await http.get<SpotifyApi.SearchResponse>(url).json();

  const tracks = trackResultToSong(data.tracks?.items || []);
  const albums = albumResultToAlbum(data.albums?.items || []);
  const artists = artistResultToArtist(data.artists?.items || []);

  const response: SearchAllResult = {
    tracks: {
      items: tracks,
      pageInfo: data.tracks && {
        resultsPerPage: data.tracks.limit,
        totalResults: data.tracks.total,
        offset: data.tracks.offset,
        nextPage: data.tracks.next || undefined,
        prevPage: data.tracks.previous || undefined,
      },
    },
    albums: {
      items: albums,
      pageInfo: data.albums && {
        resultsPerPage: data.albums.limit,
        totalResults: data.albums.total,
        offset: data.albums.offset,
        nextPage: data.albums.next || undefined,
        prevPage: data.albums.previous || undefined,
      },
    },
    artists: {
      items: artists,
      pageInfo: data.artists && {
        resultsPerPage: data.artists.limit,
        totalResults: data.artists.total,
        offset: data.artists.offset,
        nextPage: data.artists.next || undefined,
        prevPage: data.artists.previous || undefined,
      },
    },
  };

  return response;
}

async function searchTracks(
  request: SearchRequest
): Promise<SearchTrackResult> {
  let url = `${apiUrl}/search?q=${encodeURIComponent(
    request.query
  )}&type=track`;
  if (request.pageInfo?.nextPage) {
    url = request.pageInfo.nextPage;
  } else if (request.pageInfo?.prevPage) {
    url = request.pageInfo.prevPage;
  }
  const data = await http.get<SpotifyApi.SearchResponse>(url).json();
  const tracks = trackResultToSong(data.tracks?.items || []);
  return {
    items: tracks,
    pageInfo: data.tracks && {
      resultsPerPage: data.tracks.limit,
      totalResults: data.tracks.total,
      offset: data.tracks.offset,
      nextPage: data.tracks.next || undefined,
      prevPage: data.tracks.previous || undefined,
    },
  };
}
async function searchAlbums(
  request: SearchRequest
): Promise<SearchAlbumResult> {
  let url = `${apiUrl}/search?q=${encodeURIComponent(
    request.query
  )}&type=album`;
  if (request.pageInfo?.nextPage) {
    url = request.pageInfo.nextPage;
  } else if (request.pageInfo?.prevPage) {
    url = request.pageInfo.prevPage;
  }
  const data = await http.get<SpotifyApi.SearchResponse>(url).json();
  const albums = albumResultToAlbum(data.albums?.items || []);
  return {
    items: albums,
    pageInfo: data.albums && {
      resultsPerPage: data.albums.limit,
      totalResults: data.albums.total,
      offset: data.albums.offset,
      nextPage: data.albums.next || undefined,
      prevPage: data.albums.previous || undefined,
    },
  };
}
async function searchArtists(
  request: SearchRequest
): Promise<SearchArtistResult> {
  let url = `${apiUrl}/search?q=${encodeURIComponent(
    request.query
  )}&type=track`;
  if (request.pageInfo?.nextPage) {
    url = request.pageInfo.nextPage;
  } else if (request.pageInfo?.prevPage) {
    url = request.pageInfo.prevPage;
  }
  const data = await http.get<SpotifyApi.SearchResponse>(url).json();
  const artists = artistResultToArtist(data.artists?.items || []);
  return {
    items: artists,
    pageInfo: data.artists && {
      resultsPerPage: data.artists.limit,
      totalResults: data.artists.total,
      offset: data.artists.offset,
      nextPage: data.artists.next || undefined,
      prevPage: data.artists.previous || undefined,
    },
  };
}

async function getAlbumTracks(
  request: AlbumTrackRequest
): Promise<AlbumTracksResult> {
  const id = request.apiId?.split(":").pop();
  const url = `${apiUrl}/albums/${id}`;

  const data = await http.get<SpotifyApi.SingleAlbumResponse>(url).json();
  const tracks = trackResultToSong(data.tracks.items);
  tracks.forEach((t) => {
    t.albumApiId = request.apiId;
    t.images = data.images as ImageInfo[];
  });
  return {
    album: {
      name: data.name,
      artistName: data.artists[0].name,
      artistApiId: data.artists[0].id,
      addtionalArtists: data.artists.slice(1).map(
        (a): ArtistInfo => ({
          name: a.name,
          apiId: a.id,
        })
      ),
      apiId: data.id,
      images: data.images as ImageInfo[],
    },
    items: tracks,
  };
}

async function getArtistAlbums(
  request: ArtistAlbumRequest
): Promise<ArtistAlbumsResult> {
  const id = request.apiId?.split(":").pop();
  const detailsUrl = `${apiUrl}/artists/${id}`;
  let url = `${apiUrl}/artists/${id}/albums`;
  if (request.pageInfo?.nextPage) {
    url = request.pageInfo.nextPage;
  } else if (request.pageInfo?.prevPage) {
    url = request.pageInfo.prevPage;
  }
  const detailsResult = await http.get<SpotifyApi.ArtistObjectFull>(detailsUrl).json();
  const data = await http.get<SpotifyApi.ArtistsAlbumsResponse>(url).json();
  return {
    items: albumResultToAlbum(data.items),
    pageInfo: {
      resultsPerPage: data.limit,
      totalResults: data.total,
      offset: data.offset,
      nextPage: data.next || undefined,
      prevPage: data.previous || undefined,
    },
    artist: {
      name: detailsResult.name,
      apiId: detailsResult.id,
      images: detailsResult.images as ImageInfo[],
    },
  };
}

async function getPlaylistTracks(
  request: PlaylistTrackRequest
): Promise<PlaylistTracksResult> {
  const detailsUrl = `https://api.spotify.com/v1/playlists/${request.apiId}`;
  const detailsResult = await http.get<SpotifyApi.SinglePlaylistResponse>(
    detailsUrl
  ).json();
  const playlistInfo: PlaylistInfo = {
    name: detailsResult.name,
    images: detailsResult.images.map(
      (i): ImageInfo => ({
        width: i.width || 0,
        height: i.height || 0,
        url: i.url,
      })
    ),
    apiId: detailsResult.id,
  };

  const limit = 50;
  let offset = 0;
  let url = `${detailsUrl}/tracks?limit=${limit}`;
  if (request.pageInfo?.nextPage) {
    url = request.pageInfo.nextPage;
  } else if (request.pageInfo?.prevPage) {
    url = request.pageInfo.prevPage;
  }

  let allTracks: Track[] = [];

  let more = true;
  while (more) {
    const result = await http.get<SpotifyApi.PlaylistTrackResponse>(
      `${url}&offset=${offset}`
    ).json();
    const tracks: Track[] = result.items.map(
      (t): Track => ({
        albumApiId: t.track?.album && t.track.album.uri,
        apiId: t.track?.uri,
        artistName: t.track?.artists[0].name,
        artistApiId: t.track?.artists[0].uri,
        addtionalArtists: t.track?.artists.slice(1).map(
          (a): ArtistInfo => ({
            name: a.name,
            apiId: a.uri,
          })
        ),
        duration: (t.track?.duration_ms || 0) / 1000,
        images:
          t.track?.album.images.map(
            (i): ImageInfo => ({
              url: i.url,
              height: i.height || 0,
              width: i.width || 0,
            })
          ) || [],
        name: t.track?.name || "",
      })
    );
    allTracks = allTracks.concat(tracks);
    offset += limit;
    if (!result.next) {
      more = false;
    }
  }

  const response: PlaylistTracksResult = {
    playlist: playlistInfo,
    items: allTracks,
  };
  return response;
}

async function getUserPlaylists(
  request: UserPlaylistRequest
): Promise<SearchPlaylistResult> {
  let url = "https://api.spotify.com/v1/me/playlists";
  if (request.pageInfo?.nextPage) {
    url = request.pageInfo.nextPage;
  } else if (request.pageInfo?.prevPage) {
    url = request.pageInfo.prevPage;
  }
  const result = await http.get<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
    url
  ).json();

  const playlists: PlaylistInfo[] = result.items.map(
    (i): PlaylistInfo => ({
      name: i.name,
      images: i.images.map(
        (i): ImageInfo => ({
          width: i.width || 0,
          height: i.height || 0,
          url: i.url,
        })
      ),
      apiId: i.id,
    })
  );
  const response: SearchPlaylistResult = {
    items: playlists,
    pageInfo: {
      resultsPerPage: result.limit,
      offset: result.offset,
      totalResults: result.total,
      nextPage: result.next || undefined,
      prevPage: result.previous || undefined,
    },
  };
  return response;
}

async function getTopItems(): Promise<SearchAllResult> {
  const tracksUrl = "https://api.spotify.com/v1/me/top/tracks";
  const artistsUrl = "https://api.spotify.com/v1/me/top/artists";
  const tracksRequest = http.get<SpotifyApi.UsersTopTracksResponse>(tracksUrl).json();
  const artistsRequest = http.get<SpotifyApi.UsersTopArtistsResponse>(artistsUrl).json();
  const result = await Promise.all([tracksRequest, artistsRequest]);
  return {
    tracks: { items: trackResultToSong(result[0].items) },
    artists: {items: artistResultToArtist(result[1].items)}
  };
}

const playlistListRegex =
  /https?:\/\/(?:play|open)\.spotify\.[^\/]+\/(playlist)\/([^\/\?]+)/;
async function importPlaylist(url: string): Promise<Playlist> {
  const match = url.match(playlistListRegex);

  if (match) {
    const playlistId = match[2];
    const playlistResponse = await getPlaylistTracks({
      apiId: playlistId,
      isUserPlaylist: false,
    });
    const playlist: Playlist = {
      ...playlistResponse.playlist,
      tracks: playlistResponse.items,
    };
    return playlist;
  }
  throw new Error("Can't retreive playlist");
}

const spotifyPlayer = new SpotifyPlayer();
const setMethods = () => {
  application.onSearchAll = searchAll;
  application.onGetAlbumTracks = getAlbumTracks;
  application.onGetArtistAlbums = getArtistAlbums;
  application.onGetPlaylistTracks = getPlaylistTracks;
  application.onSearchTracks = searchTracks;
  application.onSearchArtists = searchArtists;
  application.onSearchAlbums = searchAlbums;
  application.onGetUserPlaylists = getUserPlaylists;
  application.onGetTopItems = getTopItems;
  application.onCanParseUrl = async (url: string, type: ParseUrlType) => {
    switch (type) {
      case "playlist":
        return playlistListRegex.test(url);
      default:
        return false;
    }
  };
  application.onLookupPlaylistUrl = importPlaylist;
  application.onPlay = spotifyPlayer.play.bind(spotifyPlayer);
  application.onPause = spotifyPlayer.pause.bind(spotifyPlayer);
  application.onResume = spotifyPlayer.resume.bind(spotifyPlayer);
  application.onSeek = spotifyPlayer.seek.bind(spotifyPlayer);
  application.onSetVolume = spotifyPlayer.setVolume.bind(spotifyPlayer);
  spotifyPlayer.loadScript();
};

const init = async () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (accessToken && refreshToken) {
    setMethods();
  }
  const theme = await application.getTheme();
  changeTheme(theme);
};

application.onDeepLinkMessage = async (message: string) => {
  application.postUiMessage({ type: "deeplink", url: message });
};

const onUiMessage = async (message: UiMessageType) => {
  switch (message.type) {
    case "logout":
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      break;
    case "set-keys":
      localStorage.setItem("clientId", message.clientId);
      break;
    case "check-login":
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (accessToken && refreshToken) {
        sendMessage({ type: "login" });
      }

      const host = document.location.host;
      const hostArray = host.split(".");
      hostArray.shift();
      const pluginId = await application.getPluginId();
      const domain = hostArray.join(".");
      const origin = `${document.location.protocol}//${domain}`;
      const clientId = localStorage.getItem("clientId") ?? "";
      sendMessage({
        type: "info",
        origin: origin,
        pluginId: pluginId,
        clientId: clientId,
      });
      break;
    case "login":
      setTokens(message.accessToken, message.refreshToken);
      setMethods();
      break;
    default:
      const _exhaustive: never = message;
      break;
  }
};

application.onUiMessage = onUiMessage;

const changeTheme = (theme: Theme) => {
  localStorage.setItem("kb-color-mode", theme);
};
application.onChangeTheme = async (theme: Theme) => {
  changeTheme(theme);
};

init();
