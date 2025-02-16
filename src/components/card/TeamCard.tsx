import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import LazyImageComponent from "../common/LazyImageComponent";

interface TeamCardProps {
  teamId: number;
  teamName: string;
  teamLogo: string;
  onTeamSelect: (teamId: number) => void; // 팀 선택 이벤트 콜백
}

const CustomCardContent = styled(CardContent)({
  backgroundColor: "#f9f9f9",
  color: "#333", // 텍스트 색상
  "&:last-child": {
    paddingBottom: "10px",
  },
});

const TeamCard: React.FC<TeamCardProps> = ({
  teamId,
  teamName,
  teamLogo,
  onTeamSelect,
}) => {
  return (
    <Card
      sx={{
        width: 150,
        margin: "auto",
        cursor: "pointer", // 클릭 가능 표시
        ":hover": { boxShadow: 6 }, // Hover 효과
      }}
      onClick={() => onTeamSelect(teamId)} // 클릭 이벤트 설정
    >
      {teamLogo ? (
        <Box
          sx={{
            display: "flex",
            padding: "5px", // Add spacing around the image
            justifyContent: "center",
          }}
        >
          <LazyImageComponent
            src={teamLogo}
            alt={`${teamName} logo`}
            size={100}
          />
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          py={6}
        >
          No Logo
        </Typography>
      )}
      <CustomCardContent>
        <Typography
          textAlign="center"
          sx={{
            fontFamily: "SUIT",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {teamName}
        </Typography>
      </CustomCardContent>
    </Card>
  );
};

export default TeamCard;
