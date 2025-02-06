/** @type {import('next').NextConfig} */
module.exports = {
  basePath: "",
  assetPrefix: "",
  output: "export",
  reactStrictMode: true, // React Strict Mode 활성화
  swcMinify: true, // SWC를 사용한 코드 압축
  images: {
    domains: ["media.api-sports.io"], // Next.js는 외부에서 이미지 가져오지 않게 되어있음.
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
  compiler: { styledComponents: true },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "removeAttrs",
                  params: { attrs: "(fill|stroke)" }, // ✅ fill과 stroke 삭제 방지
                },
                {
                  name: "removeViewBox",
                  active: false, // ✅ viewBox 유지
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};
