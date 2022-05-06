export interface ISong {
  id?: string;
  name: string;
  source: string;
  from?: string;
  apiId?: string;
  duration?: number;
  albumId?: string;
  artistId?: string;
  artistName?: string;
  images: IImage[];
}

export interface IAlbum {
  name: string;
  apiId: string;
  from: string;
  artistName?: string;
  artistId?: string;
  images: IImage[];
}

export interface IArtist {
  name: string;
  apiId: string;
  from: string;
  images: IImage[];
}

export interface IPlaylist {
  id?: string;
  name: string;
  songs?: ISong[];
  apiId?: string;
  images?: IImage[];
  from?: string;
}

export interface IImage {
  url: string;
  height: number;
  width: number;
}

export interface ISpotifyResult {
  albums: ISpotifyAlbumResult;
  artists: ISpotifyArtistResult;
  tracks: ISpotifyTrackResult;
}

export interface ISpotifyAlbumResult {
  items: ISpotifyAlbum[];
}

export interface ISpotifyAlbum {
  name: string;
  uri: string;
  artists: ISpotifyArtist[];
  images: IImage[];
}

export interface ISpotifyArtistResult {
  items: ISpotifyArtist[];
}

export interface ISpotifyArtist {
  name: string;
  uri: string;
}

export interface ISpotifyTrackResult {
  items: ISpotifyTrack[];
}

export interface ISpotifyTrack {
  name: string;
  uri: string;
  duration_ms: number;
  album: ISpotifyAlbum;
  artists: ISpotifyArtist[];
}

export interface ISpotifyPlaylistResult {
  href: string;
  limit: number;
  offset: number;
  total: number;
  items: ISpotifyPlaylistItem[];
}

export interface ISpotifyPlaylistItem {
  id: string;
  images: IImage[];
  name: string;
}

export interface ISpotifyPlaylistTrackResult {
  images: IImage[];
  name: string;
  tracks: ISpotifyPlaylistTracks;
}

export interface ISpotifyPlaylistTracks {
  items: ISpotifyPlaylistTrackItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface ISpotifyPlaylistTrackItem {
  is_local: boolean;
  track: ISpotifyTrack;
}

export interface Application {
  searchAll?: (query: string) => Promise<{
    tracks?: ISong[];
    albums?: IAlbum[];
    artists?: IArtist[];
    playlists?: IPlaylist[];
  }>;
  getTrackUrl?: (song: ISong) => Promise<void>;
  getPlaylistTracks?: (playlist: IPlaylist) => Promise<void>;
  postUiMessage: (msg: any) => Promise<void>;
  onUiMessage?: (message: any) => void;
  endTrack: () => Promise<void>;
  setTrackTime: (currentTime: number) => Promise<void>;
  play?: (song: ISong) => Promise<void>;
  setVolume?: (volume: number) => Promise<void>;
  pause?: () => Promise<void>;
  resume?: () => Promise<void>;
  seek?: (time: number) => Promise<void>;
  getAlbumTracks?: (album: IAlbum) => Promise<ISong[]>;
  getArtistAlbums?: (artist: IArtist) => Promise<IAlbum[]>;
  setPlaybackRate?: (rate: number) => Promise<void>;
  getUserPlaylists?: () => Promise<IPlaylist[]>;
}
