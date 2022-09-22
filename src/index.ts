import axios from "axios";
import { MessageType, TOKEN_URL, UiMessageType } from "./shared";
import "audiogata-plugin-typings";

const apiUrl = "https://api.spotify.com/v1";
const http = axios.create();

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

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", getClientId());
    const result = await axios.post(TOKEN_URL, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (result.data.access_token && result.data.refresh_token) {
      setTokens(result.data.access_token, result.data.refresh_token);
      return result.data.access_token as string;
    }
  } catch {
    const token = localStorage.getItem("access_token");
    return token;
  }
};

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return http(originalRequest);
    }
  }
);

function trackResultToSong(
  results: (SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified)[]
): Track[] {
  return results.map((r) => ({
    albumId: "album" in r && r.album.uri,
    apiId: r.uri,
    artistId: r.artists[0].uri,
    artistName: r.artists[0].name,
    duration: r.duration_ms / 1000,
    images: "album" in r ? (r.album.images as ImageInfo[]) : [],
    name: r.name,
  }));
}

function artistResultToArtist(
  results: SpotifyApi.ArtistObjectFull[]
): Artist[] {
  return results.map((r) => ({
    apiId: r.uri,
    name: r.name,
    images: r.images as ImageInfo[],
  }));
}

function albumResultToAlbum(
  results: SpotifyApi.AlbumObjectSimplified[]
): Album[] {
  return results.map((r) => ({
    apiId: r.uri,
    artistId: r.artists[0].uri,
    artistName: r.artists[0].name,
    artistApiId: r.artists[0].id,
    name: r.name,
    images: r.images as ImageInfo[],
  }));
}

class SpotifyPlayer {
  public name = "spotify";
  private deviceId: string;
  private interval: number | undefined;
  private previousState: Spotify.PlaybackState | null = null;
  constructor() {
    this.deviceId = "";
    this.init();
  }

  public init() {
    window.onSpotifyWebPlaybackSDKReady = this.initializePlayer.bind(this);
  }

  private initializePlayer = () => {
    const player = new window.Spotify.Player({
      getOAuthToken: async (cb: (arg0: string) => void) => {
        const accessToken = await refreshToken();
        if (accessToken) {
          cb(accessToken);
        }
      },
      name: "Web Playback SDK Quick Start Player",
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
          if (this.interval) {
            clearInterval(this.interval);
          }
          console.log("ending track: ", state);
          await application.endTrack();
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
    if (!this.deviceId) {
      return;
    }
    const url = `${apiUrl}/me/player/play?device_id=${this.deviceId}`;

    const trackId = song.apiId || "";
    await http.put(
      url,
      {
        uris: [trackId],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      }`,
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
  const results = await http.get<SpotifyApi.SearchResponse>(url);
  const data = results.data;

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
  if (request.page?.nextPage) {
    url = request.page.nextPage;
  } else if (request.page?.prevPage) {
    url = request.page.prevPage;
  }
  const results = await http.get<SpotifyApi.SearchResponse>(url);
  const data = results.data;
  const tracks = trackResultToSong(data.tracks?.items || []);
  return {
    items: tracks,
    pageInfo: data.artists && {
      resultsPerPage: data.artists.limit,
      totalResults: data.artists.total,
      offset: data.artists.offset,
      nextPage: data.artists.next || undefined,
      prevPage: data.artists.previous || undefined,
    },
  };
}
async function searchAlbums(
  request: SearchRequest
): Promise<SearchAlbumResult> {
  let url = `${apiUrl}/search?q=${encodeURIComponent(
    request.query
  )}&type=album`;
  if (request.page?.nextPage) {
    url = request.page.nextPage;
  } else if (request.page?.prevPage) {
    url = request.page.prevPage;
  }
  const results = await http.get<SpotifyApi.SearchResponse>(url);
  const data = results.data;
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
  if (request.page?.nextPage) {
    url = request.page.nextPage;
  } else if (request.page?.prevPage) {
    url = request.page.prevPage;
  }
  const results = await http.get<SpotifyApi.SearchResponse>(url);
  const data = results.data;
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
  const results = await http.get<SpotifyApi.SingleAlbumResponse>(url);
  const tracks = trackResultToSong(results.data.tracks.items);
  tracks.forEach((t) => {
    t.albumApiId = request.apiId;
    t.images = results.data.images as ImageInfo[];
  });
  return {
    album: {
      name: results.data.name,
      artistName: results.data.artists[0].name,
      artistApiId: results.data.artists[0].id,
      apiId: results.data.id,
      images: results.data.images as ImageInfo[],
    },
    items: tracks,
  };
}

async function getArtistAlbums(
  request: ArtistAlbumRequest
): Promise<ArtistAlbumsResult> {
  const id = request.apiId?.split(":").pop();
  const detailsUrl = `${apiUrl}/artists/${id}`;
  const url = `${apiUrl}/artists/${id}/albums`;
  const detailsResult = await http.get<SpotifyApi.ArtistObjectFull>(detailsUrl);
  const results = await http.get<SpotifyApi.ArtistsAlbumsResponse>(url);
  return {
    items: albumResultToAlbum(results.data.items),
    artist: {
      name: detailsResult.data.name,
      apiId: detailsResult.data.id,
      images: detailsResult.data.images as ImageInfo[],
    },
  };
}

async function getPlaylistTracks(
  request: PlaylistTrackRequest
): Promise<SearchTrackResult> {
  let url = `https://api.spotify.com/v1/playlists/${request.apiId}/tracks`;
  if (request.page?.nextPage) {
    url = request.page.nextPage;
  } else if (request.page?.prevPage) {
    url = request.page.prevPage;
  }
  const result = await http.get<SpotifyApi.PlaylistTrackResponse>(url);

  const tracks: Track[] = result.data.items.map((t) => ({
    albumId: t.track?.album && t.track.album.uri,
    apiId: t.track?.uri,
    artistId: t.track?.artists[0].uri,
    artistName: t.track?.artists[0].name,
    duration: (t.track?.duration_ms || 0) / 1000,
    images:
      t.track?.album.images.map((i) => ({
        url: i.url,
        height: i.height || 0,
        width: i.width || 0,
      })) || [],
    name: t.track?.name || "",
  }));

  const response: SearchTrackResult = {
    items: tracks,
    pageInfo: {
      resultsPerPage: result.data.limit,
      offset: result.data.offset,
      totalResults: result.data.total,
      nextPage: result.data.next || undefined,
      prevPage: result.data.previous || undefined,
    },
  };
  return response;
}

async function getUserPlaylists(
  request: UserPlaylistRequest
): Promise<SearchPlaylistResult> {
  let url = "https://api.spotify.com/v1/me/playlists";
  const result = await http.get<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
    url
  );

  const playlists: PlaylistInfo[] = result.data.items.map((i) => ({
    name: i.name,
    images: i.images.map((i) => ({
      width: i.width || 0,
      height: i.height || 0,
      url: i.url,
    })),
    apiId: i.id,
  }));
  const response: SearchPlaylistResult = {
    items: playlists,
    pageInfo: {
      resultsPerPage: result.data.limit,
      offset: result.data.offset,
      totalResults: result.data.total,
      nextPage: result.data.next || undefined,
      prevPage: result.data.previous || undefined,
    },
  };
  return response;
}

async function getTopItems(): Promise<SearchAllResult> {
  const url = "https://api.spotify.com/v1/me/top/tracks";
  const result = await http.get<SpotifyApi.UsersTopTracksResponse>(url);
  return {
    tracks: { items: trackResultToSong(result.data.items) },
  };
}

const spotifyPlayer = new SpotifyPlayer();
const setMethods = () => {
  spotifyPlayer.loadScript();
  application.onSearchAll = searchAll;
  application.onGetAlbumTracks = getAlbumTracks;
  application.onGetArtistAlbums = getArtistAlbums;
  application.onGetPlaylistTracks = getPlaylistTracks;
  application.onSearchTracks = searchTracks;
  application.onSearchArtists = searchArtists;
  application.onSearchAlbums = searchAlbums;
  application.onGetUserPlaylists = getUserPlaylists;
  application.onGetTopItems = getTopItems;
  application.onPlay = spotifyPlayer.play.bind(spotifyPlayer);
  application.onPause = spotifyPlayer.pause.bind(spotifyPlayer);
  application.onResume = spotifyPlayer.resume.bind(spotifyPlayer);
  application.onSeek = spotifyPlayer.seek.bind(spotifyPlayer);
  application.onSetVolume = spotifyPlayer.setVolume.bind(spotifyPlayer);
};

const init = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  if (accessToken && refreshToken) {
    setMethods();
  }
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
  }
};

application.onUiMessage = onUiMessage;

init();
