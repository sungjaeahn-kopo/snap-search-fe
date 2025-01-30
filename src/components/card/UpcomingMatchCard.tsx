import { Card, Typography, Box, Button } from "@mui/material";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Match } from '@/types/api';
import { useRouter } from 'next/navigation';

export const UpcomingMatchCard = ({ matchInfo, teamId, season }: { matchInfo: Match, teamId: number, season: string | null }) => {
  const router = useRouter();

  const handleNavigateToMatches = () => {
    router.push(`/team/${teamId}/matches?season=${season}`);
  };

  if (!matchInfo) return null;

  return (
    <Card
      sx={{
        p: 2, mb: 3, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", background: "white", borderRadius: "12px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)" },
      }}
      onClick={() => router.push(`/matches/${matchInfo.fixtureId}`)}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", px: 2, py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LazyImageComponent src={matchInfo.teamsHomeLogo} alt={matchInfo.teamsHomeName} width={30} height={30} style={{ objectFit: "contain", borderRadius: "50%" }} />
          <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#333" }}>{matchInfo.teamsHomeName}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: "18px", color: "#555" }}>VS</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "16px", color: "#333" }}>{matchInfo.teamsAwayName}</Typography>
          <LazyImageComponent src={matchInfo.teamsAwayLogo} alt={matchInfo.teamsAwayName} width={30} height={30} style={{ objectFit: "contain", borderRadius: "50%" }} />
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
  );
};
