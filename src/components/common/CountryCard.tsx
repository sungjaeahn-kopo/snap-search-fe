import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import LazyImageComponent from "./LazyImageComponent";

interface CountryCardProps {
  countryName: string;
  countryFlag?: string;
  countryId: number; // country id를 받아 league 리스트를 가져오기 위해 추가
  onCountrySelect: (countryId: number, countryName: string) => void; // Country 선택 시 실행할 함수
}

const CustomCardContent = styled(CardContent)({
  backgroundColor: "#f9f9f9", // 부드러운 회색 배경
  color: "#333", // 텍스트 색상
  "&:last-child": {
    paddingBottom: "10px",
  },
});

const CountryCard: React.FC<CountryCardProps> = ({
  countryName,
  countryFlag,
  countryId,
  onCountrySelect,
}) => {
  return (
    <Card
      sx={{
        width: 150,
        margin: "auto",
        cursor: "pointer", // 클릭 가능하게 표시
        ":hover": { boxShadow: 6 }, // Hover 효과
      }}
      onClick={() => onCountrySelect(countryId, countryName)}
    >
      {countryFlag ? (
        <Box
          sx={{
            display: "flex",
            padding: "5px", // Add spacing around the image
            justifyContent: "center",
          }}
        >
          <LazyImageComponent
            src={countryFlag}
            alt={`${countryName} logo`}
            width={100}
            height={100}
          />
        </Box>
      ) : (
        <Typography
          textAlign="center"
          py={6}
          sx={{
            fontFamily: "SUIT", // Select에도 폰트 적용
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          No Image
        </Typography>
      )}
      <CustomCardContent>
        <Typography
          component="div"
          textAlign="center"
          sx={{
            fontFamily: "SUIT", // Select에도 폰트 적용
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {countryName}
        </Typography>
      </CustomCardContent>
    </Card>
  );
};

export default CountryCard;
