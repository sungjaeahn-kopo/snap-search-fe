"use client";

import { matchService } from "@/api/services/MatchService";
import EventCard from "@/components/card/EventCard";
import { Spinner } from "@/components/common/Spinner";
import MatchOverview from "@/components/MatchOverview";
import { Match, MatchEvent } from "@/types/api";
import { groupEventsByTime, sortEventsByTime } from "@/utils/eventUtils";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const MatchEventDetail = ({ params }: { params: { fixtureId: number } }) => {
  const fixtureId = Number(params.fixtureId);
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  const teamId = Number(searchParams.get("teamId"));

  const { data: events, isLoading: isLoadingMatchEvent } = useQuery<MatchEvent[] | null>(
    ["matchEvents", fixtureId],
    () => {
      if (!fixtureId) return Promise.resolve(null);
      return matchService.getMatchDetail(fixtureId);
    },
    {
      enabled: !!fixtureId,
    }
  );

  const { data: matchList, isLoading } = useQuery<Match[] | null>(
    ["matchList", teamId, season],
    () => {
      if (!teamId || !season) return Promise.resolve(null);
      return matchService.getTeamMatches(teamId, season);
    },
    {
      enabled: !!teamId && !!season,
      staleTime: 1000 * 60 * 10,
    }
  );

  const currentMatch = matchList?.find((match) => match.fixtureId === fixtureId);
  const [groupedEvents, setGroupedEvents] = useState<{ [key: string]: MatchEvent[] }>({});
  const [activeTab, setActiveTab] = useState(0); // 현재 선택된 탭 상태

  useEffect(() => {
    if (events) {
      const sortedEvents = sortEventsByTime(events);
      setGroupedEvents(groupEventsByTime(sortedEvents));
    }
  }, [events]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (isLoadingMatchEvent || isLoading) return <Spinner />;

  return (
    <Box>
      {/* 매치 개요 */}
      {currentMatch && events && <MatchOverview match={currentMatch} events={events} />}

      {/* 탭 영역 */}
      <Box sx={{ marginTop: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="경기 이벤트" />
          <Tab label="라인업" />
          <Tab label="경기 기록" />
        </Tabs>
        <Divider />

        {/* 탭 내용 */}
        <Box sx={{ marginTop: 2 }}>
          {activeTab === 0 && (
            <Timeline position="alternate">
              {Object.entries(groupedEvents).map(([time, eventsAtTime], index) => {
                const isFirstHalf = parseInt(time) <= 45;
                return (
                  <React.Fragment key={index}>
                    {/* 전반 / 후반 구분 요소 추가 */}
                    {index === 0 ||
                    (index > 0 && parseInt(Object.keys(groupedEvents)[index - 1]) <= 45 && !isFirstHalf) ? (
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#1E88E5",
                          textAlign: "center",
                          margin: "16px 0",
                        }}
                      >
                        {isFirstHalf ? "🔹 전반전 (1st Half)" : "🔸 후반전 (2nd Half)"}
                      </Typography>
                    ) : null}

                    {/* 타임라인 아이템 */}
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#1976D2", width: 12, height: 12 }} />
                        {index !== Object.keys(groupedEvents).length - 1 && <TimelineConnector />}
                      </TimelineSeparator>

                      {/* 이벤트 카드 */}
                      <TimelineContent>
                        <Typography sx={{ fontWeight: "bold", fontSize: "16px", color: "#1976D2", mb: 1 }}>
                          {time}&apos;
                        </Typography>
                        {eventsAtTime.map((event, i) => (
                          <EventCard key={i} event={event} />
                        ))}
                      </TimelineContent>
                    </TimelineItem>
                  </React.Fragment>
                );
              })}
            </Timeline>
          )}
          {activeTab === 1 && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ color: "#666" }}>
                라인업 정보는 준비 중입니다.
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ color: "#666" }}>
                경기 기록 정보는 준비 중입니다.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MatchEventDetail;
