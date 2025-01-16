/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // React Strict Mode 활성화
  swcMinify: true, // SWC를 사용한 코드 압축
  images: {
    formats: ["image/webp"], // 웹 최적화된 이미지 형식
    unoptimized: true, // 이미지 최적화 비활성화
  },
  experimental: {
    appDir: true, // Next.js 13의 App Router 활성화
  },
  typescript: {
    ignoreBuildErrors: false, // 빌드 중 타입 에러 무시 방지
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 에러 무시
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
