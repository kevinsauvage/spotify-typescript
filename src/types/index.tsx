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
  album: { name: string; images: [{ height: number; url: string; width: number }] };
  uri: string;
}

export interface AlbumInterface {
  id: string;
  name: string;
  artists: ArtistInterface[];
  images: [{ height: number; url: string; width: number }];
  release_date: string;
  total_tracks: number;
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
