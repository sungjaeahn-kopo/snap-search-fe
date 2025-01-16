import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import LazyImageComponent from './LazyImageComponent';

interface TeamCardProps {
  teamName: string;
  teamLogo?: string;
  onTeamSelect?: () => void; // 팀 선택 이벤트 콜백
}

const CustomCardContent = styled(CardContent)({
  backgroundColor: "#f9f9f9",
  color: "#333", // 텍스트 색상
  "&:last-child": {
    paddingBottom: "10px",
  },
});

const TeamCard: React.FC<TeamCardProps> = ({
  teamName,
  teamLogo,
  onTeamSelect,
}) => {
  return (
    <Card
      sx={{
        width: 150,
        height: "200px",
        margin: "auto",
        cursor: "pointer", // 클릭 가능 표시
        ":hover": { boxShadow: 6 }, // Hover 효과
      }}
      onClick={onTeamSelect} // 클릭 이벤트 설정
    >
      {teamLogo ? (
        // <CardMedia
        //   component="img"
        //   image={teamLogo}
        //   alt={`${teamName} logo`}
        //   sx={{
        //     padding: "5px",
        //     borderRadius: "5px",
        //     width: "100%",
        //     height: "150px",
        //     objectFit: "contain",
        //     backgroundColor: "#f0f0f0",
        //   }}
        // />
        <LazyImageComponent src={teamLogo} alt={`${teamName} logo`} width={100} height={100} />
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
