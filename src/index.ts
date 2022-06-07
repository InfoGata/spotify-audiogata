import axios from "axios";
import { CLIENT_ID, TOKEN_URL } from "./shared";
import "audiogata-plugin-typings";

const apiUrl = "https://api.spotify.com/v1";
const http = axios.create();

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return;

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("client_id", CLIENT_ID);
  const result = await axios.post(TOKEN_URL, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (result.data.access_token && result.data.refresh_token) {
    setTokens(result.data.access_token, result.data.refresh_token);
    return result.data.access_token as string;
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

declare var application: Application;

type WebPlaybackErrors =
  | "initialization_error"
  | "authentication_error"
  | "account_error"
  | "playback_error";

interface WebPlaybackError {
  message: WebPlaybackErrors;
}

function trackResultToSong(results: SpotifyApi.TrackObjectFull[]): Track[] {
  return results.map(
    (r) =>
      ({
        albumId: r.album && r.album.uri,
        apiId: r.uri,
        artistId: r.artists[0].uri,
        artistName: r.artists[0].name,
        duration: r.duration_ms / 1000,
        images: r.album.images,
        name: r.name,
      } as Track)
  );
}

function artistResultToArtist(
  results: SpotifyApi.ArtistObjectFull[]
): Artist[] {
  return results.map((r) => ({
    apiId: r.uri,
    name: r.name,
    images: [],
  }));
}

function albumResultToAlbum(
  results: SpotifyApi.AlbumObjectSimplified[]
): Album[] {
  return results.map((r) => ({
    apiId: r.uri,
    artistId: r.artists[0].uri,
    artistName: r.artists[0].name,
    name: r.name,
    images: [],
  }));
}

class SpotifyPlayer {
  public name = "spotify";
  private deviceId: string;
  private accessToken: string;
  private internalTime: number;
  private interval: number | undefined;
  constructor() {
    this.deviceId = "";
    this.accessToken = "";
    this.internalTime = 0;
    this.init();
  }

  public init() {
    (window as any).onSpotifyWebPlaybackSDKReady =
      this.initializePlayer.bind(this);
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  private initializePlayer = () => {
    const player = new (window as any).Spotify.Player({
      getOAuthToken: async (cb: (arg0: string) => void) => {
        const accessToken = await refreshToken();
        if (accessToken) {
          cb(accessToken);
        }
      },
      name: "Web Playback SDK Quick Start Player",
    });
    // Error handling
    player.addListener("initialization_error", (error: WebPlaybackError) => {
      console.error(error);
    });
    player.addListener("authentication_error", (error: WebPlaybackError) => {
      console.error(error);
    });
    player.addListener("account_error", (error: WebPlaybackError) => {
      console.error(error);
    });
    player.addListener("playback_error", (error: WebPlaybackError) => {
      console.error(error);
    });
    // Playback status updates
    player.addListener("player_state_changed", async (state: any) => {
      await application.setTrackTime(state.position / 1000);
      this.internalTime = state.position;
      // Attempt to detect if the song has ended
      if (
        state.paused &&
        state.position === 0 &&
        state.restrictions.disallow_resuming_reasons &&
        state.restrictions.disallow_resuming_reasons[0] === "not_paused"
      ) {
        if (this.interval) {
          clearInterval(this.interval);
        }
        await application.endTrack();
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

  public async play(song: Track) {
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
    this.interval = window.setInterval(this.updateTime, 1000);
  }

  public async pause() {
    if (!this.deviceId) {
      return;
    }

    await http.put(`https://api.spotify.com/v1/me/player/pause`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (this.interval) {
      clearInterval(this.interval);
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
    this.interval = window.setInterval(this.updateTime, 1000);
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
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${
        volume * 100
      }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  private updateTime = () => {
    this.internalTime += 1000;
    application.setTrackTime(this.internalTime / 1000);
  };
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

async function getAlbumTracks(album: Album) {
  const id = album.apiId.split(":").pop();
  const url = `${apiUrl}/albums/${id}/tracks?limit=50`;
  const results = await http.get<SpotifyApi.AlbumTracksResponse>(url);
  const tracks = trackResultToSong(results.data.items as any);
  tracks.forEach((t) => {
    t.albumApiId = album.apiId;
  });
  return tracks;
}

async function getArtistAlbums(artist: Artist) {
  const id = artist.apiId.split(":").pop();
  const url = `${apiUrl}/artists/${id}/albums`;
  const results = await http.get<SpotifyApi.ArtistsAlbumsResponse>(url);
  return albumResultToAlbum(results.data.items);
}

async function getPlaylistTracks(
  request: PlaylistTrackRequest
): Promise<SearchTrackResult> {
  let url = `https://api.spotify.com/v1/playlists/${request.playlist.apiId}/tracks`;
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
    application.postUiMessage({ type: "login" });
    spotifyPlayer.setAccessToken(accessToken);
    setMethods();
  }
};

application.onDeepLinkMessage = async (message: string) => {
  application.postUiMessage({ type: "deeplink", url: message });
};

application.onUiMessage = (message) => {
  if (message === "init") {
    const host = document.location.host;
    const hostArray = host.split(".");
    hostArray.shift();
    const domain = hostArray.join(".");
    const origin = `${document.location.protocol}//${domain}`;
    application.postUiMessage({
      type: "origin",
      value: origin,
    });
  } else if (message.access_token) {
    console.log(message);
    setTokens(message.access_token, message.refresh_token);
    spotifyPlayer.setAccessToken(message.access_token);
    setMethods();
  }
};

init();
