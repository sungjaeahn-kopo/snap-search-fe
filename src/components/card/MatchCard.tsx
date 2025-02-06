import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Match } from "@/types/api";
import { convertUtcToKst } from "@/utils/dateUtils";
import { Box, Card, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalComponent from "../common/ModalComponent";

interface Props {
  match: Match;
  currentTeamId: number;
}

export const MatchCard = ({ match, currentTeamId }: Props) => {
  const router = useRouter();
  const isMatchFinished = match.fixtureStatusShort === "FT";
  const isSmallScreen = useMediaQuery("(max-width:670px)");

  let winnerTeamId = null;
  if (isMatchFinished) {
    if (match.goalsHome > match.goalsAway) {
      winnerTeamId = match.teamsHomeId;
    } else if (match.goalsAway > match.goalsHome) {
      winnerTeamId = match.teamsAwayId;
    }
  }

  const isDraw = isMatchFinished && match.goalsHome === match.goalsAway;
  const isSelectedTeamWinner = winnerTeamId === currentTeamId;
  const isSelectedTeamLoser =
    isMatchFinished &&
    !isSelectedTeamWinner &&
    !isDraw &&
    (match.teamsHomeId === currentTeamId || match.teamsAwayId === currentTeamId);

  const { date, time } = convertUtcToKst(match.fixtureDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCardClick = () => {
    if (!isMatchFinished) {
      setIsModalOpen(true); // ✅ 경기 진행 중이면 모달 띄움
      return;
    }
    router.push(`/team/${currentTeamId}/matches/detail/${match.fixtureId}`);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          cursor: "pointer",
          backgroundColor: isSelectedTeamWinner
            ? "#E3F2FD"
            : isSelectedTeamLoser
            ? "#FFEBEE"
            : isDraw
            ? "#E0E0E0"
            : "white",
          borderLeft: isSelectedTeamWinner
            ? "6px solid #1976D2"
            : isSelectedTeamLoser
            ? "6px solid #D32F2F"
            : isDraw
            ? "6px solid #757575"
            : "6px solid transparent",
          "&:hover": {
            backgroundColor: isSelectedTeamWinner
              ? "#BBDEFB"
              : isSelectedTeamLoser
              ? "#FFCDD2"
              : isDraw
              ? "#BDBDBD"
              : "#f5f5f5",
          },
        }}
        onClick={handleCardClick}
      >
        {/* 홈 팀 (왼쪽 정렬) */}
        <Box sx={{ display: "flex", alignItems: "center", width: "35%", justifyContent: "flex-start", gap: 1 }}>
          <LazyImageComponent src={match.teamsHomeLogo} alt={match.teamsHomeName} width={35} height={35} />
          {!isSmallScreen && (
            <Typography fontWeight={winnerTeamId === match.teamsHomeId ? "bold" : "normal"} sx={{ fontSize: "16px" }}>
              {match.teamsHomeName}
            </Typography>
          )}
        </Box>

        {/* 경기 정보 (가운데 정렬) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: isMatchFinished ? (isDraw ? "#616161" : "#D32F2F") : "#333",
            }}
          >
            {isMatchFinished ? `${match.goalsHome} - ${match.goalsAway}` : "VS"}
          </Typography>

          {!isMatchFinished && (
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "13px", color: "#666" }}>{date}</Typography>
              {!isSmallScreen && (
                <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#666" }}>{time}</Typography>
              )}
            </Box>
          )}

          <Typography sx={{ fontSize: "12px", color: "#888" }}>{match.leagueRound}</Typography>
        </Box>

        {/* 원정 팀 (오른쪽 정렬) */}
        <Box sx={{ display: "flex", alignItems: "center", width: "35%", justifyContent: "flex-end", gap: 1 }}>
          {!isSmallScreen && (
            <Typography fontWeight={winnerTeamId === match.teamsAwayId ? "bold" : "normal"} sx={{ fontSize: "16px" }}>
              {match.teamsAwayName}
            </Typography>
          )}
          <LazyImageComponent src={match.teamsAwayLogo} alt={match.teamsAwayName} width={35} height={35} />
        </Box>
      </Card>
      <ModalComponent
        open={isModalOpen}
        onClose={handleCloseModal}
        title="경기 상세정보 없음"
        content={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>아직 진행 중인 경기입니다.</Box>
            <Box> 경기 종료 후 상세 정보를 확인할 수 있습니다.</Box>
          </Box>
        }
      />
    </>
  );
};
