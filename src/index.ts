import axios from "axios";
import {
  ISpotifyTrack,
  ISong,
  ISpotifyArtist,
  IArtist,
  ISpotifyAlbum,
  IAlbum,
  ISpotifyResult,
  ISpotifyTrackResult,
  ISpotifyAlbumResult,
  IPlaylist,
  Application,
} from "./types";

declare var application: Application;

type WebPlaybackErrors =
  | "initialization_error"
  | "authentication_error"
  | "account_error"
  | "playback_error";

interface WebPlaybackError {
  message: WebPlaybackErrors;
}

function trackResultToSong(results: ISpotifyTrack[]): ISong[] {
  return results.map(
    (r) =>
      ({
        albumId: r.album && r.album.uri,
        apiId: r.uri,
        artistId: r.artists[0].uri,
        artistName: r.artists[0].name,
        duration: r.duration_ms / 1000,
        from: "spotify",
        images: r.album.images,
        name: r.name,
      } as ISong)
  );
}

function artistResultToArtist(results: ISpotifyArtist[]): IArtist[] {
  return results.map(
    (r) =>
      ({
        apiId: r.uri,
        from: "spotify",
        name: r.name,
      } as IArtist)
  );
}

function albumResultToAlbum(results: ISpotifyAlbum[]): IAlbum[] {
  return results.map(
    (r) =>
      ({
        apiId: r.uri,
        artistId: r.artists[0].uri,
        artistName: r.artists[0].name,
        from: "spotify",
        name: r.name,
      } as IAlbum)
  );
}

class SpotifyPlayer {
  public name = "spotify";
  private readonly apiUrl = "https://api.spotify.com/v1";
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
        cb(this.accessToken);
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

  public async play(song: ISong) {
    if (!this.deviceId) {
      return;
    }
    const url = `${this.apiUrl}/me/player/play?device_id=${this.deviceId}`;

    const trackId = song.apiId || "";
    await axios.put(
      url,
      {
        uris: [trackId],
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
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

    await fetch(`https://api.spotify.com/v1/me/player/pause`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public async resume() {
    if (!this.deviceId) {
      return;
    }

    await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
    this.interval = window.setInterval(this.updateTime, 1000);
  }

  public async seek(timeInSeconds: number) {
    if (!this.deviceId) {
      return;
    }

    await fetch(
      `https://api.spotify.com/v1/me/player/seek?position_ms=${
        timeInSeconds * 1000
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
  }

  public async setVolume(volume: number) {
    await fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${
        volume * 100
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
  }

  private updateTime = () => {
    this.internalTime += 1000;
    application.setTrackTime(this.internalTime / 1000);
  };

  public async searchAll(query: string) {
    console.log("start");
    if (!this.accessToken) {
      return { tracks: [], albums: [], artists: [] };
    }
    const url = `${this.apiUrl}/search?q=${encodeURIComponent(
      query
    )}&type=album,artist,track`;
    const results = await axios.get<ISpotifyResult>(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const data = results.data;
    const tracks = trackResultToSong(data.tracks.items);
    const albums = albumResultToAlbum(data.albums.items);
    const artists = artistResultToArtist(data.artists.items);
    return { tracks, albums, artists };
  }

  public async getAlbumTracks(album: IAlbum) {
    if (!this.accessToken) {
      return [];
    }
    const id = album.apiId.split(":").pop();
    const url = `${this.apiUrl}/albums/${id}/tracks?limit=50`;
    const results = await axios.get<ISpotifyTrackResult>(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const tracks = trackResultToSong(results.data.items);
    tracks.forEach((t) => {
      t.albumId = album.apiId;
    });
    return tracks;
  }

  public async getArtistAlbums(artist: IArtist) {
    if (!this.accessToken) {
      return [];
    }
    const id = artist.apiId.split(":").pop();
    const url = `${this.apiUrl}/artists/${id}/albums`;
    const results = await axios.get<ISpotifyAlbumResult>(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return albumResultToAlbum(results.data.items);
  }

  public async getPlaylistTracks(_playlist: IPlaylist) {
    return [];
  }
}

const spotifyPlayer = new SpotifyPlayer();

const setMethods = () => {
  spotifyPlayer.loadScript();
  application.searchAll = spotifyPlayer.searchAll.bind(spotifyPlayer);
  application.getAlbumTracks = spotifyPlayer.getAlbumTracks.bind(spotifyPlayer);
  application.getArtistAlbums =
    spotifyPlayer.getArtistAlbums.bind(spotifyPlayer);
  application.play = spotifyPlayer.play.bind(spotifyPlayer);
  application.pause = spotifyPlayer.pause.bind(spotifyPlayer);
  application.resume = spotifyPlayer.resume.bind(spotifyPlayer);
  application.seek = spotifyPlayer.seek.bind(spotifyPlayer);
  application.setVolume = spotifyPlayer.setVolume.bind(spotifyPlayer);
};

const init = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    application.postUiMessage({ type: "login" });
    spotifyPlayer.setAccessToken(token);
    setMethods();
  }
};

application.onUiMessage = (message) => {
  console.log("spotify: ", message);
  if (message === "init") {
    application.postUiMessage({
      type: "origin",
      value: document.location.origin,
    });
    const token = localStorage.getItem("access_token");
    if (token) {
      application.postUiMessage({ type: "login" });
    }
  } else if (message.access_token) {
    localStorage.setItem("access_token", message.access_token);
    spotifyPlayer.setAccessToken(message.access_token);
    setMethods();
  }
};

init();
