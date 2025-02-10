"use client";

import { matchService } from "@/api/services/MatchService";
import { MatchCard } from "@/components/card/MatchCard";
import { Spinner } from "@/components/common/Spinner";
import { Match } from "@/types/api";
import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "react-query";

const MatchDetail = ({ teamId, season }: { teamId: number; season: string | null }) => {
  // Cache에서 찾지 못한 경우 서버에서 데이터 가져오기
  const { data: matchList, isLoading } = useQuery<Match[] | null>(
    ["matchList", teamId, season],
    () => {
      if (!teamId || !season) return Promise.resolve(null);
      return matchService.getTeamMatches(teamId, season);
    },
    {
      enabled: !!teamId && !!season,
      staleTime: 1000 * 60 * 10,
    }
  );

  if (isLoading) return <Spinner />;

  const parseDate = (dateString: string) => {
    return new Date(dateString.replace(" UTC", "Z")).getTime();
  };

  const sortedMatches = matchList
    ? [...matchList].sort((a, b) => parseDate(b.fixtureDate) - parseDate(a.fixtureDate))
    : [];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        경기 일정
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedMatches?.map((match) => (
          <MatchCard key={match.fixtureId} match={match} currentTeamId={teamId} />
        ))}
      </Box>
    </Container>
  );
};

export default MatchDetail;
