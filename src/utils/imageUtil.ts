/**
 * URL에서 사이즈를 추가하여 변환하는 유틸 함수
 * @param originalUrl 원본 이미지 URL
 * @param width 이미지 너비
 * @param height 이미지 높이
 * @returns 변환된 URL
 */
export const transformImageUrl = (originalUrl: string, size: number): string => {
  if (!originalUrl) return '';

  try {
    const url = new URL(originalUrl);

    // 기존 URL의 경로를 분리
    const pathParts = url.pathname.split('/');

    // 경로에 사이즈 추가
    const sizePath = `${size}x${size}`;
    pathParts.splice(pathParts.length - 1, 0, sizePath);

    // 새로운 경로 설정
    url.pathname = pathParts.join('/');

    return url.toString();
  } catch (error) {
    console.error('Invalid URL:', originalUrl, error);
    return originalUrl; // URL 파싱 실패 시 원본 URL 반환
  }
};
