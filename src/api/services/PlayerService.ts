import { apiClient } from "../config";
import { Player, TeamWithPlayer } from "@/types/api";

export const playerService = {
  getPlayerInfo: async (teamId: number): Promise<TeamWithPlayer> => {
    const { data } = await apiClient.get<TeamWithPlayer>(
      `/api/players/playerInfo?teamId=${teamId}`
    );

    return data;
  },
};
