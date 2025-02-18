import { Card, Typography, Box } from "@mui/material";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Player } from '@/types/api';
import UniformIcon from "@/assets/uniformIcon.svg";

export const PlayerCard = ({ player, teamColor, complementaryColor }: { player: Player; teamColor: string, complementaryColor: string }) => (
  <Card
    sx={{
      width: "calc(20% - 16px)",
      minWidth: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      padding: "10px",
      textAlign: "center",
      borderRadius: "8px",
      zIndex: 1,
    }}
  >
    {/* 등번호 + 유니폼 아이콘 */}
    {player.number && (
      <Box
        sx={{
          position: "absolute",
          top: "5px",
          left: "5px",
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <UniformIcon style={{
          width: '30px',
          height: '30px',
          fill: teamColor,
        }} />
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 700,
            fontSize: "14px",
            color: complementaryColor,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            zIndex: 3,
          }}
        >
          {player.number}
        </Typography>
      </Box>
    )}

    {/* 선수 이미지 */}
    <LazyImageComponent
      src={player.photo || "/placeholder.png"}
      alt={`${player.name} 사진`}
      size={80}
      style={{ marginBottom: "10px", objectFit: "contain" }}
    />

    {/* 선수 정보 */}
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          minHeight: "40px",
          mb: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>{player.name}</Typography>
      <Typography sx={{ fontSize: "12px", color: "#777", mt: "4px" }}>
        {player.age} years
      </Typography>
    </Box>
  </Card>
);
