import { apiClient } from "../config";
import { Match, MatchEvent } from "@/types/api";

export const matchService = {
  getUpcomingMatchInfo: async (teamId: number, season: string): Promise<Match> => {
    const { data } = await apiClient.get<Match>(
      `/api/matches/upcoming?teamId=${teamId}&season=${season}`
    );

    return data;
  },

  getTeamMatches: async (teamId: number, season: string): Promise<Match[]> => {
    const { data } = await apiClient.get<Match[]>(
      `/api/matches?teamId=${teamId}&season=${season}`
    );

    return data;
  },

  getMatchDetail: async (matchId: number): Promise<MatchEvent[]> => {
    const { data } = await apiClient.get<MatchEvent[]>(
      `/api/match-event?fixtureId=${matchId}`
    );

    return data;
  },
};
