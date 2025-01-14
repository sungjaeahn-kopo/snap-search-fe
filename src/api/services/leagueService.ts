import { apiClient } from "../config";
import { Country } from "@/types/api";

export const leagueService = {
  getCountries: async (season: string): Promise<Country[]> => {
    const { data } = await apiClient.get<Country[]>(
      `/api/mapping/countryInfo?season=${season}`
    );
    return data;
  },

  // getUserById: (id: number) => apiClient.get<ApiResponse<User>>(`/users/${id}`),

  // createUser: (userData: Omit<User, "id">) =>
  //   apiClient.post<ApiResponse<User>>("/users", userData),
};
