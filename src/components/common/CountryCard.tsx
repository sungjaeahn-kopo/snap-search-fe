import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";

interface CountryCardProps {
  countryName: string;
  countryFlag?: string;
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
}) => {
  return (
    <Card sx={{ width: 150, margin: "auto" }}>
      {countryFlag ? (
        <Box
          sx={{
            padding: "5px", // Add spacing around the image
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={countryFlag}
            alt={`${countryName} flag`}
          />
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          py={6}
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
