export const fetchGrandmasters = async (): Promise<{ players: string[] }> => {
  const res = await fetch("https://api.chess.com/pub/titled/GM");
  if (!res.ok) {
    throw new Error("Failed to fetch grandmasters");
  }
  return res.json();
};

export const fetchUser = async (username: string): Promise<any> => {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${username}`);
  }
  return res.json();
};
