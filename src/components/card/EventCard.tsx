import CardIcon from "@/assets/card.svg";
import SubstitutionIcon from "@/assets/change.svg";
import GoalIcon from "@/assets/goal-icon.svg";
import VarIcon from "@/assets/var.svg";
import LazyImageComponent from "@/components/common/LazyImageComponent";
import { EventType } from "@/constants/eventTypes";
import { MatchEvent } from "@/types/api";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const EventCard = ({ event }: { event: MatchEvent }) => {
  const router = useRouter();
  const isGoalType = event.eventType === EventType.GOAL;
  const isSubType = event.eventType === EventType.SUBSTITUTION;
  const isVarType = event.eventType === EventType.VAR;
  const isCardType = event.eventType === EventType.CARD;

  const getEventStyle = (eventType: string, detail: string) => {
    switch (eventType) {
      case EventType.GOAL:
        return { icon: <GoalIcon width={24} height={24} />, bgColor: "#FFF3CD" };
      case EventType.CARD:
        return {
          icon: <CardIcon fill={detail === "Yellow Card" ? "yellow" : "red"} width={24} height={24} />,
          bgColor: "#FFEBEE",
        };
      case EventType.SUBSTITUTION:
        return { icon: <SubstitutionIcon width={24} height={24} />, bgColor: "#E3F2FD" };
      case EventType.VAR:
        return getVarEventStyle(detail);
      default:
        return { icon: null, bgColor: "#F5F5F5" };
    }
  };

  const getVarEventStyle = (detail: string) => {
    if (["Goal confirmed", "Penalty confirmed", "Card upgrade", "Penalty awarded"].includes(detail)) {
      return {
        icon: <VarIcon width={24} height={24} />,
        bgColor: "#E8F5E9",
        borderColor: "#2E7D32",
        textColor: "#1B5E20",
      }; // 초록색 (긍정적 판정)
    }
    if (["Goal cancelled", "Penalty cancelled", "Red card cancelled", "Goal Disallowed"].includes(detail)) {
      return {
        icon: <VarIcon width={24} height={24} />,
        bgColor: "#FFEBEE",
        borderColor: "#D32F2F",
        textColor: "#B71C1C",
      }; // 빨간색 (부정적 판정)
    }
    return {
      icon: <VarIcon width={24} height={24} />,
      bgColor: "#ECEFF1",
      borderColor: "#607D8B",
      textColor: "#37474F",
    }; // 회색 (중립적인 판정)
  };

  const { icon, bgColor } = getEventStyle(event.eventType, event.detail);

  return (
    <motion.div
      className="p-3 rounded-lg shadow-lg w-72 flex items-center gap-3 border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push(`/player/${event.playerId}`)}
      style={{ backgroundColor: bgColor, cursor: "pointer" }}
    >
      {/* 아이콘 */}
      <div className="flex items-center justify-center w-10 h-10">{icon}</div>

      {/* 팀 정보 */}
      <div className="flex flex-col w-full">
        <div className="flex items-center space-x-2 mb-2">
          {event.teamLogo && <LazyImageComponent src={event.teamLogo} alt={event.teamName} size={35} />}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {event.teamName}
          </Typography>
        </div>
        {/* <Typography variant="body2">{event.playerName}</Typography>
        {event.assistName && (
          <Typography variant="caption" sx={{ color: "#757575" }}>
            어시스트: {event.assistName}
          </Typography>
        )} */}

        {/* VAR 이벤트일 경우 특별 표기 */}
        {isVarType ? (
          <>
            <Typography variant="body2">{event.playerName}</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              📢 {event.detail}
            </Typography>
          </>
        ) : (
          <>
            {/* 골 이벤트일 경우에만 어시스트 표시 */}
            {isGoalType && (
              <>
                <Typography variant="body2">{event.playerName}</Typography>
                {event.assistName && (
                  <Typography variant="caption" className="text-gray-600">
                    어시스트: {event.assistName}
                  </Typography>
                )}
              </>
            )}

            {/* 교체 이벤트일 경우, 교체된 선수만 표시 */}
            {isSubType && (
              <div className="flex flex-col">
                <Typography
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "#2E7D32",
                  }}
                >
                  ⬆ {event.playerName}
                </Typography>

                {event.assistName && (
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "13px",
                      opacity: 0.7,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "#D32F2F",
                    }}
                  >
                    ⬇ {event.assistName}
                  </Typography>
                )}
              </div>
            )}
            {isCardType && <Typography variant="body2">{event.playerName}</Typography>}
            {event.timeExtra > 0 && (
              <Typography variant="caption" className="text-gray-600">
                추가시간 +{event.timeExtra}
              </Typography>
            )}
            {event.detail && (
              <Typography variant="caption" className="text-gray-600">
                {event.detail}
              </Typography>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
