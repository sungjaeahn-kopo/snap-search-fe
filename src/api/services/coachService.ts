import { apiClient } from "../config";
import { Coach, Country, League, Team } from "@/types/api";

export const coachService = {
  getCoachInfo: async (teamId: number): Promise<Coach> => {
    const { data } = await apiClient.get<Coach>(
      `/api/coachInfo?teamId=${teamId}`
    );

    return data;
  },
};
