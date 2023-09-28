import { TrackInterface } from '@/components/_cards/Track/Track';

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

export interface PlaylistTracksInterface {
  href: string;
  items: [{ track: TrackInterface }];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
