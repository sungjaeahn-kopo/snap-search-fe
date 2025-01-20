"use client";

import { coachService } from "@/api/services/coachService";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Coach } from "@/types/api";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useQuery } from "react-query";

export default function TeamDetail({ params }: { params: { teamId: number } }) {
  const { data: coach, isLoading: isLoadingCoach } = useQuery<Coach | null>(
    ["coach", params.teamId],
    () => {
      if (!params?.teamId) return null; // countryId가 없으면 빈 배열 반환
      return coachService.getCoachInfo(params?.teamId);
    },
    {
      enabled: !!params?.teamId, // countryId가 있을 때만 호출
    }
  );
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 감독 정보 */}
      {coach && (
        <Card sx={{ display: "flex", mb: 4 }}>
          <LazyImageComponent
            src={coach.photo}
            alt={`${coach.name} 로고`}
            width={100}
            height={100}
            style={{ marginBottom: "10px", objectFit: "contain" }}
          />
          {/* <CardMedia
            component="img"
            image={coach?.photo}
            alt={`${coach?.id} 로고`}
            sx={{ width: 150, height: 150, objectFit: "contain", margin: "16px" }}
            /> */}
          <CardContent>
            <Typography
              sx={{
                fontFamily: "SUIT", // Select에도 폰트 적용
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              {coach?.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "SUIT", // Select에도 폰트 적용
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              나이: {coach?.age}
            </Typography>
            <Typography
              sx={{
                fontFamily: "SUIT", // Select에도 폰트 적용
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              국적: {coach?.nationality}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* 커리어 리스트 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            mb: 2,
            fontFamily: "SUIT", // Select에도 폰트 적용
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          감독 커리어
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "flex-start",
          }}
        >
          {coach?.careers?.map((career) => (
            <Card
              key={career.teamId}
              sx={{
                width: "calc(33.333% - 16px)", // 한 줄에 3개 배치
                minWidth: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <LazyImageComponent
                src={career.teamLogo || "/placeholder.png"}
                alt={`${career.teamName} 로고`}
                width={100}
                height={100}
                style={{ marginBottom: "10px", objectFit: "contain" }}
              />
              <Typography
                sx={{
                  mb: 2,
                  fontFamily: "SUIT", // Select에도 폰트 적용
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                {career.teamName}
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  fontFamily: "SUIT", // Select에도 폰트 적용
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {career.startDate} ~ {career.endDate || "현재"}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
      {/* 팀 정보 */}
      {/* <Card sx={{ display: "flex", mb: 4 }}>
        <CardMedia
          component="img"
          image={teamData.teamLogo}
          alt={`${teamData.teamName} 로고`}
          sx={{ width: 150, height: 150, objectFit: "contain", margin: "16px" }}
        />
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {teamData.teamName}
          </Typography>
          <Typography variant="body1">창단: {teamData.founded}</Typography>
          <Typography variant="body1">위치: {teamData.teamLocation}</Typography>
          <Typography variant="body1">감독: {teamData.coach}</Typography>
        </CardContent>
      </Card> */}

      {/* 경기장 정보 */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          경기장 정보
        </Typography>
        <Typography variant="body1">
          경기장 이름: {teamData.stadium.name}
        </Typography>
        <Typography variant="body1">
          수용 인원: {teamData.stadium.capacity}명
        </Typography>
      </Box> */}

      {/* 선수 정보 */}
      {/* <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          선수 정보
        </Typography>
        <Grid container spacing={2}>
          {teamData.players.map((player: any) => (
            <Grid item xs={12} sm={6} md={4} key={player.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={player.photo || "/placeholder.png"} // 사진 없을 시 기본 이미지
                  alt={player.name}
                  sx={{ height: 140, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{player.name}</Typography>
                  <Typography variant="body2">
                    포지션: {player.position}
                  </Typography>
                  <Typography variant="body2">
                    국적: {player.nationality}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
  );
}
