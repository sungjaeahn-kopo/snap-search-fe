import { Card, CardContent, Typography } from "@mui/material";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Coach } from "@/types/api";

export const CoachCard = ({ coach, onClickCoach }: { coach: Coach, onClickCoach: (coach: Coach) => void }) => (
  <Card sx={{
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginBottom: "30px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    "&:hover": { boxShadow: "0px 6px 10px rgba(0,0,0,0.2)" },
  }} onClick={() => onClickCoach(coach)}>
    <LazyImageComponent
      src={coach.photo}
      alt={`${coach.name} 로고`}
      width={70}
      height={70}
      style={{ marginBottom: "10px", objectFit: "contain" }}
    />
    <CardContent>
      <Typography sx={{ fontFamily: "SUIT", fontSize: "20px", fontWeight: 700 }}>
        {coach.name}
      </Typography>
      <Typography sx={{ fontFamily: "SUIT", fontSize: "16px", fontWeight: 400 }}>
        나이: {coach.age}
      </Typography>
      <Typography sx={{ fontFamily: "SUIT", fontSize: "16px", fontWeight: 400 }}>
        국적: {coach.nationality}
      </Typography>
    </CardContent>
  </Card>
);
