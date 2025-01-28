import Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";

/**
 * 이미지 URL을 기반으로 색상 팔레트를 추출하여 그라데이션 스타일 반환
 * @param avatarImage 이미지 URL
 * @returns 그라데이션 CSS 스타일 문자열
 */
export const getGradient = async (avatarImage: string): Promise<string> => {
  let gradientStyle = "";

  try {
    // Vibrant 라이브러리를 이용하여 색상 팔레트 추출
    const palette: Palette = await Vibrant.from(avatarImage).getPalette();
    console.log(palette);

    if (palette && palette.Vibrant && palette.Muted) {
      const startColor = palette.LightVibrant
        ? palette.LightVibrant.getRgb()
        : palette.Vibrant.getRgb();
      const endColor = palette.DarkVibrant
        ? palette.DarkVibrant.getRgb()
        : palette.Muted.getRgb();

      // 그라데이션 CSS 스타일 생성
      gradientStyle = `linear-gradient(to right, rgb(${startColor.join(
        ", "
      )}), rgb(${endColor.join(", ")}))`;
    }
  } catch (error) {
    console.error("색상 추출 중 오류 발생:", error);
  }

  return gradientStyle;
};
