"use client";

import { matchService } from '@/api/services/MatchService';
import { MatchCard } from '@/components/card/MatchCard';
import { Match } from '@/types/api';
import { Card, Typography, Box, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from 'react-query';

const MatchDetail = ({ params }: { params: { teamId: number } }) => {
  const teamId = Number(params.teamId);
  const searchParams = useSearchParams();
  const season = searchParams.get("season");

  // Cache에서 찾지 못한 경우 서버에서 데이터 가져오기
  const { data: matchList, isLoading } = useQuery<Match[] | null>(
    ["matchList", teamId, season],
    () => {
      if (!teamId || !season) return Promise.resolve(null);
      return matchService.getTeamMatches(
        teamId,
        season
      );
    },
    {
      enabled: !!teamId && !!season,
    }
  );
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  const sortedMatches = matchList
    ? [...matchList].sort((a, b) => new Date(b.fixtureDate).getTime() - new Date(a.fixtureDate).getTime())
    : [];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        경기 일정
      </Typography>

      {isLoading ? (
        <Typography>로딩 중...</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sortedMatches?.map((match) => (
            <MatchCard key={match.fixtureId} match={match} currentTeamId={teamId} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MatchDetail;
