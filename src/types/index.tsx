/* eslint-disable no-use-before-define */
export interface ArtistInterface {
  id: string;
  name: string;
  popularity: number;
  images: [{ url: string; width: number; height: number }];
  href: string;
  followers: {
    href: 'string';
    total: 0;
  };
  genres: string[];
}

export interface TrackInterface {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  artists: ArtistInterface[];
  external_urls: { spotify: string };
  album: AlbumInterface;
  uri: string;
}

export interface AlbumInterface {
  id: string;
  name: string;
  artists: ArtistInterface[];
  images: [{ height: number; url: string; width: number }];
  release_date: string;
  total_tracks: number;
  album_type: string;
  uri: string;
  external_urls: { spotify: string };
  tracks: {
    items: TrackInterface[];
  };
  popularity: number;
  genres: string[];
  label: string;
}

export interface PlaylistInterface {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: [{ height: number; url: string; width: number }];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    items: TrackInterface[];
    total: number;
    limit: number;
    offset: number;
    next: string;
    previous: string;
  };
}

export interface PlaylistResponseInterface {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: [{ height: number; url: string; width: number }];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
}

export interface UserDataInterface {
  display_name: string;
  followers: {
    total: number;
  };
}

export interface StatInterface {
  title: string;
  value: number;
}

export interface UserPlaylistInterface {
  items: [PlaylistInterface];
  limit: number;
  offset: number;
  total: number;
}

export interface UserSavedTracksInterface {
  items: [{ track: TrackInterface }];
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}

export interface RecentlyPlayedInterface {
  items: [{ track: TrackInterface }];
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}

export interface UserTopTrackInterface {
  items: TrackInterface[];
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
}

export interface PlaylistTracksInterface {
  href: string;
  items: [{ track: TrackInterface }];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface UserTopArtistInterface {
  items: ArtistInterface[];
  limit: number;
  offset: number;
  total: number;
}

export interface FollowedArtistsInterface {
  artists: {
    items: ArtistInterface[];
    next: string;
    limit: number;
    total: number;
    cursors: {
      after: string;
    };
  };
}

export interface SavedAlbumResponseInterface {
  items: [{ album: AlbumInterface }];
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
}

export interface NewReleasesAlbums {
  albums: {
    items: AlbumInterface[];
    limit: number;
    offset: number;
    total: number;
    next: string;
    previous: string;
  };
}

export interface ArtistAlbumsInterface {
  items: AlbumInterface[];
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
}

export interface AudioAnalysisInterface {
  bars: Array<{
    start: number;
    duration: number;
    confidence: number;
  }>;
  beats: Array<{
    start: number;
    duration: number;
    confidence: number;
  }>;
  sections: Array<{
    start: number;
    duration: number;
    confidence: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
  }>;
  segments: Array<{
    start: number;
    duration: number;
    confidence: number;
    loudness_start: number;
    loudness_max: number;
    loudness_max_time: number;
    loudness_end: number;
    pitches: Array<number>;
    timbre: Array<number>;
  }>;
  tatums: Array<{
    start: number;
    duration: number;
    confidence: number;
  }>;
  track: {
    num_samples: number;
    duration: number;
    sample_md5: string;
    offset_seconds: number;
    window_seconds: number;
    analysis_sample_rate: number;
    analysis_channels: number;
    end_of_fade_in: number;
    start_of_fade_out: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    codestring: string;
    code_version: number;
    echoprintstring: string;
    echoprint_version: number;
    synchstring: string;
    synch_version: number;
    rhythmstring: string;
    rhythm_version: number;
  };
}

export interface AudioFeaturesInterface {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}
