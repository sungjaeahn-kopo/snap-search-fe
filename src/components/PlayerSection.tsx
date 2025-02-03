import { Box, Typography } from "@mui/material";
import { PlayerCard } from "@/components/card/PlayerCard";
import { PlayerPosition, PlayerPositionLabel } from "@/constants/positions";
import { TeamWithPlayer } from "@/types/api";

interface PlayerSectionProps {
  playerInfo: TeamWithPlayer;
  teamColor: string;
  complementaryColor: string;
}

export function PlayerSection({ playerInfo, teamColor, complementaryColor }: PlayerSectionProps) {
  return (
    <Box>
      {Object.values(PlayerPosition).map((position) => (
        <Box key={position} sx={{ mb: 6 }}>
          <Typography sx={{ mb: 3, fontWeight: 700, fontSize: "22px" }}>{PlayerPositionLabel[position]}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            {playerInfo.players
              .filter((p) => PlayerPosition[p.position as keyof typeof PlayerPosition] === position)
              .map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  teamColor={teamColor}
                  complementaryColor={complementaryColor}
                />
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
