import { MatchEvent } from "@/types/api";

// 이벤트를 시간순으로 정렬하는 함수 (추가시간까지 고려)
export const sortEventsByTime = (events: MatchEvent[]) => {
  return events.sort((a, b) => {
    if (a.timeElapsed !== b.timeElapsed) return a.timeElapsed - b.timeElapsed;
    return (a.timeExtra || 0) - (b.timeExtra || 0);
  });
};

// 이벤트를 시간별로 그룹화 (추가시간 고려)
export const groupEventsByTime = (events: MatchEvent[]) => {
  const grouped = new Map<string, MatchEvent[]>();

  events.forEach((event) => {
    const key = event.timeElapsed.toString();
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)?.push(event);
  });

  return Object.fromEntries(grouped);
};
