export type ApiResponse<T> = T;

export interface Country {
  leagueSeason: string;
  countryId: number;
  countryName: string;
  countryFlag: string;
}

export interface League {
  leagueSeason: string;
  countryId: number;
  countryName: string;
  countryFlag: string;
  leagueId: number;
  leagueName: string;
  leagueLogo: string;
}
export interface Team {
  leagueSeason: string;
  countryName: string;
  countryFlag: string;
  teamId: number;
  teamName: string;
  teamLogo: string;
}
export interface Coach {
  id: number;
  name: string;
  age: string;
  nationality: string;
  photo: string;
  careers: Career[];
}
export interface Career {
  teamId: number;
  teamName: string;
  teamLogo: string;
  startDate: string;
  endDate: string;
}
export interface Player {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}
export interface TeamWithPlayer {
  teamId: number;
  players: Player[];
}
export interface Match {
  fixtureId: number;

  fixtureDate: string;
  fixtureStatusShort: string;
  leagueName: string;
  leagueSeason: string;
  leagueRound: string;

  teamsHomeId: number;
  teamsHomeName: string;
  teamsHomeLogo: string;
  teamsAwayId: number;
  teamsAwayName: string;
  teamsAwayLogo: string;

  goalsHome: string;
  goalsAway: string;
  scoreHalftimeHome: string;
  scoreHalftimeAway: string;
  scoreFulltimeHome: string;
  scoreFulltimeAway: string;
}

