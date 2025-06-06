export const getLeagueColor = (league: string) => {
  switch (league) {
    case "Legend":
      return "grape";
    case "Diamond":
      return "blue";
    case "Master":
      return "yellow";
    default:
      return "gray";
  }
};
