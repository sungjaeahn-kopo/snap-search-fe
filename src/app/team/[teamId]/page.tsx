"use client";

import { coachService } from "@/api/services/coachService";
import { leagueService } from '@/api/services/leagueService';
import { matchService } from '@/api/services/MatchService';
import { playerService } from '@/api/services/PlayerService';
import { CoachCard } from '@/components/card/CoachCard';
import { PlayerCard } from '@/components/card/PlayerCard';
import { UpcomingMatchCard } from '@/components/card/UpcomingMatchCard';
import { CareerList } from '@/components/CareerList';
import LazyImageComponent from "@/components/common/LazyImageComponent";
import ModalComponent from '@/components/common/ModalComponent';
import { PlayerPosition, PlayerPositionLabel } from '@/constants/positions';
import { Coach, Match, Team, TeamWithPlayer } from "@/types/api";
import { getContrastColor, getDominantColor } from '@/utils/colorExtractor';
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "react-query";

export default function TeamDetail({ params }: { params: { teamId: number } }) {
  const queryClient = useQueryClient();
  const teamId = Number(params.teamId);
  const [gradientStyle, setGradientStyle] = useState<string>("");
  const [complementaryStyle, setComplementaryStyle] = useState<string>("");
  const searchParams = useSearchParams();

  // 쿼리 문자열 값 가져오기
  const season = searchParams.get("season");
  const league = Number(searchParams.get("league"));
  const country = Number(searchParams.get("country"));

  // React Query Cache에서 팀 데이터를 가져오기
  const cachedTeams = queryClient.getQueryData<Team[]>(["teams"]);
  const teamFromCache = cachedTeams?.find((team) => team.teamId === teamId);

  const { data: coach, isLoading: isLoadingCoach } = useQuery<Coach | null>(
    ["coach", params.teamId],
    () => {
      if (!params?.teamId) return null; // countryId가 없으면 빈 배열 반환
      return coachService.getCoachInfo(params?.teamId);
    },
    {
      enabled: !!params?.teamId, // countryId가 있을 때만 호출
    }
  );

  const { data: playerInfo, isLoading: isLoadingPlayer } = useQuery<TeamWithPlayer | null>(
    ["playerInfo", params.teamId],
    () => {
      if (!params?.teamId) return null; // countryId가 없으면 빈 배열 반환
      return playerService.getPlayerInfo(params?.teamId);
    },
    {
      enabled: !!params?.teamId, // countryId가 있을 때만 호출
    }
  );

  // Cache에서 찾지 못한 경우 서버에서 데이터 가져오기
  const { data: teamsFromServer } = useQuery<Team[]>(
    ["team"],
    () => {
      if (!country || !league || !season) return Promise.resolve([]);
      return leagueService.getTeamsByLeague(
        country,
        league,
        season
      );
    },
    {
      enabled: !teamFromCache // Cache에 데이터가 있을 경우 호출하지 않음
    }
  );

  // Cache에서 찾지 못한 경우 서버에서 데이터 가져오기
  const { data: matchInfo } = useQuery<Match | null>(
    ["upcomingMatchInfo", teamId, season],
    () => {
      if (!teamId || !season) return Promise.resolve(null);
      return matchService.getUpcomingMatchInfo(
        teamId,
        season
      );
    },
    {
      enabled: !!teamId && !!season,
      keepPreviousData: false,
    }
  );

  const teamFromServer = teamsFromServer?.find((team) => team.teamId === teamId);
  const team = teamFromCache || teamFromServer;

  const [modalData, setModalData] = useState<{ title: string; content: React.ReactNode } | null>(
    null
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenModal = (title: string, content: React.ReactNode) => {
    setModalData({ title, content });
    setDialogOpen(true);
  };

  const handleCloseModal = () => {
    setModalData(null);
    setDialogOpen(false);
  };

  const handleCoachClick = (coach: Coach) => {
    handleOpenModal(
      `${coach.name}의 커리어`,
      <CareerList careers={coach.careers} /> // CareerList 사용
    );
  };

  useEffect(() => {
    if (team?.teamLogo) {
      getDominantColor(team.teamLogo).then(dominantColor => {
        setGradientStyle(dominantColor); // 대표 색상 적용
        const complementaryColor = getContrastColor(dominantColor); // 보색 계산
        setComplementaryStyle(complementaryColor); // 보색 설정
      });
    }
  }, [team?.teamLogo]); // teamLogo가 변경될 때마다 useEffect 실행

  return (
    <Container sx={{ py: 4 }}>
      {/* 팀 정보 */}
      {team && (
        <Card sx={{ display: "flex", alignItems: 'center', mb: 4, background: gradientStyle }}>
          <LazyImageComponent
            src={team.teamLogo || "/placeholder.png"}
            alt={`${team.teamName} 로고`}
            style={{ width: 100, height: 100, objectFit: "contain", margin: "16px", background: 'white' }}
          />
          <CardContent>
            <Typography sx={{ fontWeight: 700, fontSize: "22px", color: complementaryStyle }}>
              {team.teamName}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mt: 4 }}>
        {/* 다가오는 경기 */}
        {matchInfo && <UpcomingMatchCard matchInfo={matchInfo} teamId={teamId} season={season} />}
      </Box>

      {/* 감독 정보 */}
      {coach && <CoachCard coach={coach} onClickCoach={() => handleCoachClick(coach)} />}

      {/* 경기장 정보 */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          경기장 정보
        </Typography>
        <Typography variant="body1">
          경기장 이름: {teamData.stadium.name}
        </Typography>
        <Typography variant="body1">
          수용 인원: {teamData.stadium.capacity}명
        </Typography>
      </Box> */}

      {/* 선수 정보 */}
      {playerInfo && Object.values(PlayerPosition).map((position) => (
        <Box key={position} sx={{ mb: 6 }}>
          <Typography
            sx={{
              mb: 3,
              fontWeight: 700,
              fontSize: "22px",
            }}
          >
            {PlayerPositionLabel[position]}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {playerInfo.players
              .filter((p) => PlayerPosition[p.position as keyof typeof PlayerPosition] === position)
              .map((player) => (
                <PlayerCard key={player.id} player={player} teamColor={gradientStyle} complementaryColor={complementaryStyle} />
              ))}
          </Box>
        </Box>
      ))}

      {/* 공통 모달 */}
      {modalData && (
        <ModalComponent
          open={isDialogOpen}
          onClose={handleCloseModal}
          title={modalData.title}
          content={modalData.content}
        />
      )}
    </Container>
  );
}
