import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

/**
 * UTC 문자열을 KST(한국 표준시)로 변환하는 함수
 * @param utcStr "2024-08-18 15:30:00 UTC" 형식의 문자열
 * @returns { date: "yyyy.MM.dd", time: "a h:mm" } (예: { date: "2024.08.18", time: "오후 3:30" })
 */
export const convertUtcToKst = (utcStr: string) => {
  if (!utcStr) return { date: "", time: "" };

  // UTC 문자열을 ISO 8601로 변환
  const isoDate = utcStr.replace(" UTC", "").replace(" ", "T") + "Z";

  // ISO 8601 형식을 Date 객체로 변환
  const parsedDate = parseISO(isoDate);
  if (isNaN(parsedDate.getTime())) {
    console.error("Error: Invalid parsedDate:", isoDate);
    return { date: "Invalid", time: "Invalid" };
  }

  // KST 변환
  const kstDate = toZonedTime(parsedDate, "Asia/Seoul");

  return {
    date: format(kstDate, "yyyy.MM.dd"), // 날짜만 추출
    time: format(kstDate, "a h:mm"), // 오전/오후 h:mm
  };
};
