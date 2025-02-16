"use client";

import CardIcon from "@/assets/card.svg";
import GoalIcon from "@/assets/goal-icon.svg";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { EventType } from "@/constants/eventTypes";
import { teamStore } from "@/stores/teamStore";
import { Match, MatchEvent } from "@/types/api";
import { Box, Card, Divider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface MatchOverviewProps {
  match: Match;
  events: MatchEvent[];
}

const MatchOverview = ({ match, events }: MatchOverviewProps) => {
  // 주요 이벤트 필터링
  const isGoalType = (eventType: string) => eventType === EventType.GOAL;
  const isCardType = (eventType: string) => eventType === EventType.CARD;
  const homeTeamLogo = match.teamsHomeLogo;
  const keyEvents = events.filter(
    (event) => isGoalType(event.eventType) || (isCardType(event.eventType) && event.detail === "Red Card")
  );

  // 주요 이벤트 스코어 계산 메서드
  const getScoreByEvent = (eventTime: number) => {
    let homeScore = 0;
    let awayScore = 0;

    events.forEach((event) => {
      if (isGoalType(event.eventType) && event.timeElapsed <= eventTime) {
        if (event.teamId === match.teamsHomeId) {
          homeScore++;
        } else if (event.teamId === match.teamsAwayId) {
          awayScore++;
        }
      }
    });

    return {
      home: homeScore,
      away: awayScore,
    };
  };

  useEffect(() => {
    if (homeTeamLogo) {
      teamStore.setTeamLogo(homeTeamLogo);
    }
    return () => teamStore.setTeamLogo(undefined);
  }, [homeTeamLogo]);

  return (
    <Card
      sx={{
        padding: 4,
        margin: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        backgroundColor: "#F9FAFB",
      }}
    >
      {/* 상단 타이틀 및 날짜 */}
      <Typography variant="subtitle2" sx={{ color: "#6B7280", marginBottom: 3, textAlign: "center" }}>
        {match.leagueName} {match.leagueRound.match(/\d+/)?.[0]}
      </Typography>

      {/* 팀 및 스코어 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        {/* 홈 팀 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LazyImageComponent src={match.teamsHomeLogo} alt={match.teamsHomeName} size={35} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#374151" }}>
            {match.teamsHomeName}
          </Typography>
        </Box>

        {/* 스코어 */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#1E40AF",
                textAlign: "center",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {match.goalsHome} - {match.goalsAway}
            </Typography>
          </motion.div>
        </Box>

        {/* 원정 팀 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#374151" }}>
            {match.teamsAwayName}
          </Typography>
          <LazyImageComponent src={match.teamsAwayLogo} alt={match.teamsAwayName} size={35} />
        </Box>
      </Box>

      {/* 주요 이벤트 */}
      <Divider sx={{ marginY: 2, borderColor: "#E5E7EB" }} />
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "center",
          color: "#1F2937",
        }}
      >
        주요 이벤트
      </Typography>

      {keyEvents.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {keyEvents.map((event, index) => {
            const score = getScoreByEvent(event.timeElapsed);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#1E40AF",
                    minWidth: "50px",
                    textAlign: "center",
                  }}
                >
                  {event.timeElapsed}&apos;
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    gap: "5px",
                    flex: 1,
                    color: "#374151",
                  }}
                >
                  {event.playerName}{" "}
                  {isGoalType(event.eventType) ? (
                    <GoalIcon width={20} height={20} />
                  ) : (
                    <CardIcon fill="red" width={24} height={24} />
                  )}
                </Typography>
                {isGoalType(event.eventType) && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        flex: 1,
                        fontWeight: "bold",
                        color: event.teamId === match.teamsHomeId ? "#34D399" : "#F87171",
                        textAlign: "right",
                      }}
                    >
                      {score.home} - {score.away}
                    </Typography>
                  </motion.div>
                )}
                <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                  {event.teamName}
                </Typography>
              </motion.div>
            );
          })}
        </Box>
      ) : (
        <Typography variant="body2" sx={{ color: "#9CA3AF", textAlign: "center", marginTop: 2 }}>
          주요 이벤트 없음
        </Typography>
      )}
    </Card>
  );
};

export default MatchOverview;
