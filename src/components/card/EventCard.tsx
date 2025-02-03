import CardIcon from "@/assets/card.svg";
import SubstitutionIcon from "@/assets/change.svg";
import GoalIcon from "@/assets/goal-icon.svg";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { EventType } from "@/constants/eventTypes";
import { MatchEvent } from "@/types/api";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const EventCard = ({ event }: { event: MatchEvent }) => {
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
  const { icon } = getEventStyle(event.eventType, event.detail);

  return (
    <motion.div
      className="mb-2 p-3 rounded-lg shadow-md w-64 min-h-[100px] flex items-center gap-3 border-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 아이콘 */}
      <div className="flex items-center justify-center w-10 h-10">{icon}</div>

      {/* 내용 */}
      <div className="flex flex-col w-full">
        {/* 팀 로고 + 팀명 */}
        <div className="flex items-center space-x-2">
          {event.teamLogo && <LazyImageComponent src={event.teamLogo} alt={event.teamName} />}
          <Typography variant="h6" className="font-bold">
            {event.teamName}
          </Typography>
        </div>

        {/* 선수 이름 + 어시스트 */}
        <Typography variant="body2">{event.playerName}</Typography>
        {event.assistName && (
          <Typography variant="caption" className="text-gray-600">
            어시스트: {event.assistName}
          </Typography>
        )}

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
};

export default EventCard;
