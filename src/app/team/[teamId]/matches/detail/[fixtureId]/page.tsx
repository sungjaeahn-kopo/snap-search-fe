"use client";

import { matchService } from '@/api/services/MatchService';
import LazyImageComponent from '@/components/common/LazyImageComponent';
import { MatchEvent } from '@/types/api';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import { Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GoalIcon from '@/assets/goal-icon.svg';
import CardIcon from '@/assets/card.svg';
import SubstitutionIcon from '@/assets/change.svg';
import { motion } from 'framer-motion';

const MatchEventDetail = ({ params }: { params: { fixtureId: number } }) => {
  const fixtureId = Number(params.fixtureId);

  const { data: events, isLoading } = useQuery<MatchEvent[] | null>(
    ["matchEvents", fixtureId],
    () => {
      if (!fixtureId) return Promise.resolve(null);
      return matchService.getMatchDetail(
        fixtureId
      );
    },
    {
      enabled: !!fixtureId,
    }
  );

  const [groupedEvents, setGroupedEvents] = useState<{ [key: string]: MatchEvent[] }>({});

  const getEventStyle = (eventType: string, detail: string) => {
    switch (eventType) {
      case "Goal":
        return { icon: <GoalIcon style={{ width: 20, height: 20 }} /> };
      case "Card":
        return {
          icon: <CardIcon style={{ fill: detail === "Yellow Card" ? 'yellow' : 'red', width: 20, height: 20 }} />
        }
      case "subst":
        return { icon: <SubstitutionIcon style={{ width: 20, height: 20 }} /> };
      default:
        return { icon: null, bgColor: "bg-gray-100 text-gray-700" };
    }
  };

  useEffect(() => {
    if (events) {
      const grouped = new Map();

      events.forEach(event => {
        const key = event.timeElapsed;
        if (!grouped.has(key)) {
          grouped.set(key, new Set());
        }
        grouped.get(key).add(JSON.stringify(event));
      });

      // JSON 문자열을 다시 객체로 변환하여 Set을 배열로 저장
      const formattedGroupedEvents = new Map<string, MatchEvent[]>();
      grouped.forEach((value, key) => {
        formattedGroupedEvents.set(
          key,
          Array.from(value as Set<string>).map(item => JSON.parse(item as string))
        );
      });

      setGroupedEvents(Object.fromEntries(formattedGroupedEvents));
    }
  }, [events]);

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
          <TimelineContent className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'} px-2`}>
            {groupedEvents[time].map((event, i) => {
              const { icon, bgColor } = getEventStyle(event.eventType, event.detail);

              return (
                <motion.div
                  key={i}
                  className={`mb-2 p-3 rounded-lg shadow-md w-64 min-h-[100px] flex items-center gap-3 border-2 ${bgColor}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 아이콘 (좌측 정렬 + 중앙 정렬) */}
                  <div className="flex items-center justify-center w-10 h-10">{icon}</div>

                  {/* 내용 */}
                  <div className="flex flex-col w-full">
                    {/* 팀 로고 + 팀명 */}
                    <div className="flex items-center space-x-2">
                      {event.teamLogo && (
                        <LazyImageComponent
                          src={event.teamLogo}
                          alt={event.teamName}
                          width={50}
                          height={50}
                        />
                      )}
                      <Typography variant="h6" className={`font-bold`}>
                        {event.teamName}
                      </Typography>
                    </div>

                    {/* 이벤트 설명 (선수 이름 + 어시스트) */}
                    <div className="flex flex-col text-gray-900 whitespace-normal break-words">
                      <Typography variant="body2">
                        {event.playerName}
                      </Typography>
                      {event.assistName && (
                        <Typography variant="caption" className="text-gray-600">
                          어시스트: {event.assistName}
                        </Typography>
                      )}
                    </div>

                    {/* 추가 시간 */}
                    {event.timeExtra > 0 && (
                      <Typography variant="caption" className="text-gray-600">
                        추가시간 +{event.timeExtra}
                      </Typography>
                    )}

                    {/* 상세 설명 */}
                    {event.detail && (
                      <Typography variant="caption" className="text-gray-600">
                        {event.detail}
                      </Typography>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default MatchEventDetail;

