import React from "react";
import { Box } from "@mui/material";
import { Career } from '@/types/api';
import { CareerCard } from './card/CareerCard';

function cleanUpCareers(careers: Career[]): Career[] {
  // endDate가 null인 팀과 나머지 팀 분리
  const currentTeams = careers.filter((career) => !career.endDate);
  const otherTeams = careers.filter((career) => career.endDate);

  // 현재 팀이 둘 이상인 경우 처리
  if (currentTeams.length > 1) {
    const latestCurrentTeam = currentTeams.reduce((latest, current) =>
      new Date(current.startDate).getTime() > new Date(latest.startDate).getTime() ? current : latest
    );

    // 나머지 현재 팀의 endDate를 최신 팀의 startDate로 설정
    currentTeams.forEach((team) => {
      if (team !== latestCurrentTeam) {
        team.endDate = latestCurrentTeam.startDate;
      }
    });
  }

  // 정렬: endDate가 null인 팀이 먼저, 나머지는 startDate 기준 내림차순
  return [...currentTeams, ...otherTeams].sort((a, b) => {
    if (!a.endDate) return -1; // a가 현재 팀일 경우
    if (!b.endDate) return 1; // b가 현재 팀일 경우
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime(); // startDate 기준 내림차순
  });
}


export const CareerList = ({ careers }: { careers: Career[] }) => {
  const cleanedCareers = cleanUpCareers(careers);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "flex-start",
      }}
    >
      {cleanedCareers.map((career) => (
        <CareerCard key={career.teamId} career={career} />
      ))}
    </Box>
  );
};