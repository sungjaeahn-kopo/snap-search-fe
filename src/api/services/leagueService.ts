import { apiClient } from "../config";
import { Country, League, Team } from "@/types/api";

export const leagueService = {
  getCountries: async (season: string): Promise<Country[]> => {
    const { data } = await apiClient.get<Country[]>(
      `/api/mapping/countryInfo?season=${season}`
    );
    return data;
  },

  getLeaguesByCountry: async (
    countryId: number,
    season: string
  ): Promise<League[]> => {
    const { data } = await apiClient.get<League[]>(
      `/api/mapping/leagueInfo?season=${season}&countryId=${countryId}`
    );
    return data;
  },

  getTeamsByLeague: async (
    countryId: number,
    leagueId: number,
    season: string
  ): Promise<Team[]> => {
    const { data } = await apiClient.get<Team[]>(
      `/api/mapping/teamInfo?season=${season}&countryId=${countryId}&leagueId=${leagueId}`
    );
    return data;
  },

  // getUserById: (id: number) => apiClient.get<ApiResponse<User>>(`/users/${id}`),

  // createUser: (userData: Omit<User, "id">) =>
  //   apiClient.post<ApiResponse<User>>("/users", userData),
};
