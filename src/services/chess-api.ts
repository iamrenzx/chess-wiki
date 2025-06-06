import type { CountryResponse } from "../types/country";
import type { UserResponse } from "../types/user";

export const fetchGrandmasters = async (): Promise<{ players: string[] }> => {
  const res = await fetch("https://api.chess.com/pub/titled/GM");
  if (!res.ok) {
    throw new Error("Failed to fetch grandmasters");
  }
  return res.json();
};

export const fetchUser = async (username: string): Promise<UserResponse> => {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${username}`);
  }
  return res.json();
};

export const fetchCountry = async (
  countryUrl: string
): Promise<CountryResponse> => {
  const res = await fetch(countryUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch grandmasters");
  }
  return res.json();
};
