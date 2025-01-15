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
