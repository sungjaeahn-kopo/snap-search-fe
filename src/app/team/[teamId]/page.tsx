"use client";

import { coachService } from "@/api/services/coachService";
import { leagueService } from '@/api/services/leagueService';
import { playerService } from '@/api/services/PlayerService';
import { CoachCard } from '@/components/card/CoachCard';
import { PlayerCard } from '@/components/card/PlayerCard';
import { CareerList } from '@/components/CareerList';
import LazyImageComponent from "@/components/common/LazyImageComponent";
import ModalComponent from '@/components/common/ModalComponent';
import { Coach, Team, TeamWithPlayer } from "@/types/api";
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

  // 포지션 별로 선수 분류
  const groupedPlayers = playerInfo?.players.reduce(
    (acc, player) => {
      if (player.position === "Goalkeeper") acc.goalkeepers.push(player);
      else if (player.position === "Defender") acc.defenders.push(player);
      else if (player.position === "Midfielder") acc.midfielders.push(player);
      else if (player.position === "Attacker") acc.attackers.push(player);
      return acc;
    },
    {
      goalkeepers: [],
      defenders: [],
      midfielders: [],
      attackers: [],
    } as {
      goalkeepers: typeof playerInfo["players"];
      defenders: typeof playerInfo["players"];
      midfielders: typeof playerInfo["players"];
      attackers: typeof playerInfo["players"];
    }
  );

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
            style={{ width: 100, height: 100, objectFit: "contain", margin: "16px" }}
          />
          <CardContent>
            <Typography sx={{ fontWeight: 700, fontSize: "22px", }}>
              {team.teamName}
            </Typography>
          </CardContent>
        </Card>
      )}

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
      {groupedPlayers && (
        <>
          {["goalkeepers", "defenders", "midfielders", "attackers"].map(
            (positionKey) => {
              const positionName =
                positionKey === "goalkeepers"
                  ? "골키퍼"
                  : positionKey === "defenders"
                    ? "수비수"
                    : positionKey === "midfielders"
                      ? "미드필더"
                      : "공격수";

              return (
                <Box key={positionKey} sx={{ mb: 6 }}>
                  <Typography
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      fontSize: "22px",
                    }}
                  >
                    {positionName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "16px",
                      justifyContent: "center",
                    }}
                  >
                    {groupedPlayers[positionKey as keyof typeof groupedPlayers]?.map((player) => (
                      <PlayerCard key={player.id} player={player} teamColor={gradientStyle} complementaryColor={complementaryStyle} />
                    ))}
                  </Box>
                </Box>
              );
            }
          )}
        </>
      )}

      {/* 선수 정보 */}
      {/* <Box>
        <Typography sx={{ mb: 2 }}>
          선수 정보
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
          }}
        >
          {playerInfo?.players?.map((player) => (
            <Card
              key={player.id}
              sx={{
                width: "calc(20% - 20px)", // 한 줄에 3개 배치
                minWidth: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                // padding: "5px",
              }}
            >
              <LazyImageComponent
                src={player.photo || "/placeholder.png"}
                alt={`${player.name} 로고`}
                width={100}
                height={100}
                style={{ marginBottom: "10px", objectFit: "contain" }}
              />
              <CardContent>
                <Typography>{player.name}</Typography>
                <Typography>
                  포지션: {player.position}
                </Typography>
                <Typography>
                  등번호: {player.number}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box> */}
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
