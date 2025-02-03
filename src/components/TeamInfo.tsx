import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Team } from "@/types/api";
import { Card, CardContent, Typography } from "@mui/material";

interface TeamInfoProps {
  team: Team;
  gradientStyle: string;
  complementaryStyle: string;
}

export function TeamInfo({ team, gradientStyle, complementaryStyle }: TeamInfoProps) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 4,
        background: gradientStyle,
      }}
    >
      <LazyImageComponent
        src={team.teamLogo || "/placeholder.png"}
        alt={`${team.teamName} 로고`}
        style={{
          width: 100,
          height: 100,
          objectFit: "contain",
          margin: "16px",
          background: "white",
        }}
      />
      <CardContent>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "22px",
            color: complementaryStyle,
          }}
        >
          {team.teamName}
        </Typography>
      </CardContent>
    </Card>
  );
}
