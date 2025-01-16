import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import Image from 'next/image';
import LazyImageComponent from './LazyImageComponent';

interface LeagueCardProps {
  leagueName: string;
  leagueLogo: string;
  leagueId: number;
  onLeagueSelect: (leagueId: number, leagueName: string) => void;
}

const CustomCardContent = styled(CardContent)({
  backgroundColor: "#f9f9f9",
  color: "#333", // 텍스트 색상
  "&:last-child": {
    paddingBottom: "10px",
  },
});

const LeagueCard: React.FC<LeagueCardProps> = ({
  leagueName,
  leagueLogo,
  leagueId,
  onLeagueSelect,
}) => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card
      sx={{
        width: 150,
        height: "200px",
        margin: "auto",
        cursor: "pointer", // 클릭 가능하게 표시
        ":hover": { boxShadow: 6 }, // Hover 효과
      }}
      onClick={() => onLeagueSelect(leagueId, leagueName)} // 클릭 이벤트 설정
    >
      {!isImageLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="150px"
          sx={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "#e0e0e0",
          }}
        />
      )}
      {leagueLogo ? (
        <LazyImageComponent src={leagueLogo} alt={`${leagueName} logo`} width={50} height={50} />
        // <CardMedia
        //   component="img"
        //   image={optimizedLogo}
        //   alt={`${leagueName} logo`}
        //   loading="lazy"
        //   sx={{
        //     padding: "5px",
        //     borderRadius: "5px",
        //     width: "100%",
        //     height: "150px",
        //     objectFit: "contain",
        //     backgroundColor: "#f0f0f0",
        //   }}
        // />
        // <Image
        //     src={optimizedLogo}
        //     alt={`${leagueName} logo`}
        //     layout="fill"
        //     objectFit="contain"
        //     style={{ borderRadius: "5px", padding: "5px" }}
        //     sizes="150px" // 이미지 크기 지정
        //   />
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
            fontSize: "16px",
            fontWeight: 500,
            whiteSpace: "nowrap", // 줄 바꿈 방지
            overflow: "hidden", // 넘치는 텍스트 숨김
            textOverflow: "ellipsis", // 말줄임표 표시
            maxWidth: "100%", // 카드 너비에 맞게
          }}
          title={leagueName} // 전체 이름 툴팁으로 표시
        >
          {leagueName}
        </Typography>
      </CustomCardContent>
    </Card>
  );
};

export default LeagueCard;
