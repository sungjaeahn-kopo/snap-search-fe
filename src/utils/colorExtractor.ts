import Vibrant from "node-vibrant";
import { Palette, Swatch } from "node-vibrant/lib/color";

/**
 * 이미지 URL을 기반으로 주요 색상을 추출하여 단일 색상 반환
 * @param avatarImage 이미지 URL
 * @returns 단일 색상 문자열 (예: "rgb(255, 0, 0)")
 */
export const getDominantColor = async (avatarImage: string): Promise<string> => {
  try {
    // Vibrant 라이브러리를 이용하여 색상 팔레트 추출
    const palette: Palette = await Vibrant.from(avatarImage).getPalette();

    if (palette) {
      // 모든 색상 swatch 객체를 배열로 변환 후, 가장 픽셀 개수가 많은 색상 선택
      const sortedSwatches = Object.values(palette)
        .filter((swatch): swatch is Swatch => swatch !== null) // null 값 제거
        .sort((a, b) => (b.population ?? 0) - (a.population ?? 0)); // 인구수(픽셀 개수) 기준 정렬

      const dominantSwatch = sortedSwatches[0]; // 가장 많은 픽셀을 차지하는 색상 선택

      if (dominantSwatch) {
        return `rgb(${dominantSwatch.getRgb().join(", ")})`;
      }
    }
  } catch (error) {
    console.error("색상 추출 중 오류 발생:", error);
  }

  return "rgb(0, 0, 0)";
};

/**
 * RGB 색상의 보색(Complementary Color)을 계산하는 함수
 * @param rgbColor 대표 색상 (예: "rgb(30, 100, 200)")
 * @returns 보색 RGB 문자열 (예: "rgb(225, 155, 55)")
 */
export const getContrastColor = (color: string): string => {
  const rgb = color.match(/\d+/g)?.map(Number); // RGB 값 추출
  if (!rgb || rgb.length < 3) return "#FFFFFF"; // 기본값

  const [r, g, b] = rgb;

  // 밝기 계산 (YIQ 공식)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

  // 임계값 140을 기준으로 색상 선택 (적절히 조정 가능)
  return brightness > 140 ? "#000000" : "#FFFFFF";
};

