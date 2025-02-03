import { MatchEvent } from "@/types/api";

// 이벤트를 시간별로 그룹화
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
