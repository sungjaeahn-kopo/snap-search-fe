"use client";

import { matchService } from "@/api/services/MatchService";
import CardIcon from "@/assets/card.svg";
import SubstitutionIcon from "@/assets/change.svg";
import GoalIcon from "@/assets/goal-icon.svg";
import EventCard from "@/components/card/EventCard";
import { Spinner } from "@/components/common/Spinner";
import { EventType } from "@/constants/eventTypes";
import { MatchEvent } from "@/types/api";
import { groupEventsByTime } from "@/utils/eventUtils";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
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

  const getEventStyle = (eventType: string, detail: string) => {
    switch (eventType) {
      case EventType.GOAL:
        return { icon: <GoalIcon style={{ width: 20, height: 20 }} /> };
      case EventType.CARD:
        return {
          icon: <CardIcon style={{ fill: detail === "Yellow Card" ? "yellow" : "red", width: 20, height: 20 }} />,
        };
      case EventType.SUBSTITUTION:
        return { icon: <SubstitutionIcon style={{ width: 20, height: 20 }} /> };
      default:
        return { icon: null, bgColor: "bg-gray-100 text-gray-700" };
    }
  };

  useEffect(() => {
    if (events) setGroupedEvents(groupEventsByTime(events));
  }, [events]);

  if (isLoadingMatchEvent) return <Spinner />;

  return (
    <Timeline position="alternate">
      {Object.keys(groupedEvents).map((time, index) => (
        <TimelineItem key={index} className="flex items-center">
          {/* 타임라인 + 시간 표시 */}
          <TimelineSeparator className="flex flex-col items-center min-w-[40px]">
            <div className="flex items-center">
              {index % 2 === 0 ? (
                <Typography variant="body2" className="mr-2 font-semibold text-gray-700">
                  {time}&apos;
                </Typography>
              ) : null}
              <TimelineDot color="primary" />
              {index % 2 !== 0 ? (
                <Typography variant="body2" className="ml-2 font-semibold text-gray-700">
                  {time}&apos;
                </Typography>
              ) : null}
            </div>
            {index !== Object.keys(groupedEvents).length - 1 && <TimelineConnector className="bg-gray-300 w-[2px]" />}
          </TimelineSeparator>

          {/* 이벤트 카드 */}
          <TimelineContent className={`flex flex-col ${index % 2 === 0 ? "items-start" : "items-end"} px-2`}>
            {groupedEvents[time].map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default MatchEventDetail;
