"use client";

import { matchService } from "@/api/services/MatchService";
import EventCard from "@/components/card/EventCard";
import { Spinner } from "@/components/common/Spinner";
import { MatchEvent } from "@/types/api";
import { groupEventsByTime, sortEventsByTime } from "@/utils/eventUtils";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const MatchEventDetail = ({ params }: { params: { fixtureId: number } }) => {
  const fixtureId = Number(params.fixtureId);

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

  const [groupedEvents, setGroupedEvents] = useState<{ [key: string]: MatchEvent[] }>({});

  useEffect(() => {
    if (events) {
      const sortedEvents = sortEventsByTime(events);
      setGroupedEvents(groupEventsByTime(sortedEvents));
    }
  }, [events]);

  if (isLoadingMatchEvent) return <Spinner />;

  return (
    <Timeline position="alternate">
      {Object.entries(groupedEvents).map(([time, eventsAtTime], index) => {
        const isFirstHalf = parseInt(time) <= 45;
        return (
          <React.Fragment key={index}>
            {/* 전반 / 후반 구분 요소 추가 */}
            {index === 0 || (index > 0 && parseInt(Object.keys(groupedEvents)[index - 1]) <= 45 && !isFirstHalf) ? (
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
  );
};

export default MatchEventDetail;
