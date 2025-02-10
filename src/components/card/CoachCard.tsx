import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Coach } from "@/types/api";
import { Button, Card, CardContent, Typography } from "@mui/material";

export const CoachCard = ({ coach, onClickCoach }: { coach: Coach; onClickCoach: (coach: Coach) => void }) => (
  <Card
    sx={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: "10px",
      marginBottom: "30px",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      "&:hover": { boxShadow: "0px 6px 10px rgba(0,0,0,0.2)" },
    }}
    onClick={() => onClickCoach(coach)}
  >
    <LazyImageComponent
      src={coach.photo}
      alt={`${coach.name} 로고`}
      width={70}
      height={70}
      style={{ marginBottom: "10px", objectFit: "contain" }}
    />
    <CardContent sx={{ flex: 1 }}>
      <Typography
        sx={{
          fontFamily: "SUIT",
          fontSize: "20px",
          fontWeight: 700,
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
        }}
      >
        {coach.name}
        <Typography
          component="span"
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#4CAF50", // 나이 강조 색상
            backgroundColor: "#E8F5E9", // 연한 초록 배경
            borderRadius: "12px",
            padding: "2px 8px", // 텍스트 패딩
            marginLeft: "8px",
          }}
        >
          {coach.age} years
        </Typography>
      </Typography>
      <Typography
        sx={{
          fontFamily: "SUIT",
          fontSize: "16px",
          fontWeight: 400,
          color: "#555",
        }}
      >
        {coach.nationality}
      </Typography>
    </CardContent>
    <Button
      variant="contained"
      color="primary"
      onClick={() => onClickCoach(coach)}
      sx={{
        fontSize: "12px",
        padding: "8px 14px",
        borderRadius: "8px",
        backgroundColor: "#1E88E5",
        "&:hover": {
          backgroundColor: "#1565C0",
        },
      }}
    >
      커리어 보기
    </Button>
  </Card>
);
