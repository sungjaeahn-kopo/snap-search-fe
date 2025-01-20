import { apiClient } from "../config";
import { Coach, Country, League, Team } from "@/types/api";

export const coachService = {
  getCoachInfo: async (teamId: number): Promise<Coach> => {
    const { data } = await apiClient.get<Coach>(
      `/api/coachInfo?teamId=${teamId}`
    );
    console.log(data);
    return data;
  },

  // getUserById: (id: number) => apiClient.get<ApiResponse<User>>(`/users/${id}`),

  // createUser: (userData: Omit<User, "id">) =>
  //   apiClient.post<ApiResponse<User>>("/users", userData),
};
