export type UserResponse = {
  "@id": string;
  url: string;
  username: string;
  player_id: number;
  title: string;
  status: string;
  name: string;
  avatar: string;
  location: string;
  country: string;
  joined: number;
  league: string;
  last_online: number;
  followers: number;
  is_streamer: boolean;
  twitch_url: string;
  fide: number;
  verified: string;
  streaming_platforms: StreamingPlatforms;
};

type StreamingPlatforms = {
  type: string;
  channel_url: string;
}[];
