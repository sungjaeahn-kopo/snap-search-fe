import { Card, Typography, Box, Button } from "@mui/material";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Match } from '@/types/api';
import { useRouter } from 'next/navigation';
import ModalComponent from '../common/ModalComponent';
import { useState } from 'react';

export const UpcomingMatchCard = ({ matchInfo, teamId, season }: { matchInfo: Match, teamId: number, season: string | null }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNavigateToMatches = () => {
    router.push(`/team/${teamId}/matches?season=${season}`);
  };

  if (!matchInfo) return null;

  const handleCardClick = () => {
    setIsModalOpen(true);
    return;
  };

  return (
    <>
      <Card
        sx={{
          p: 2, mb: 3, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", background: "white", borderRadius: "12px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 2, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LazyImageComponent src={matchInfo.teamsHomeLogo} alt={matchInfo.teamsHomeName} size={35} style={{ objectFit: "contain", borderRadius: "50%" }} />
            <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#333" }}>{matchInfo.teamsHomeName}</Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: "18px", color: "#555" }}>VS</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#333" }}>{matchInfo.teamsAwayName}</Typography>
            <LazyImageComponent src={matchInfo.teamsAwayLogo} alt={matchInfo.teamsAwayName} size={35} style={{ objectFit: "contain", borderRadius: "50%" }} />
          </Box>
        </Box>
        <Typography sx={{ fontSize: "14px", opacity: 0.8, textAlign: "center", mb: 1, color: "#666" }}>
          {matchInfo.fixtureDate} | {matchInfo.leagueRound}
        </Typography>
        <Button
          variant="outlined" color="primary"
          onClick={(e) => { e.stopPropagation(); handleNavigateToMatches(); }}
          sx={{
            mt: 1, fontWeight: "bold", fontSize: "14px", padding: "6px 12px", borderRadius: "6px",
            borderColor: "#333", color: "#333",
            "&:hover": { backgroundColor: "#f8f8f8" }
          }}
        >
          경기 일정 더보기
        </Button>
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
