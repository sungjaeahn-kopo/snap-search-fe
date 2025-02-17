# 1. Node.js 환경 설정
FROM node:18 AS builder

WORKDIR /app
# 2. 로컬 파일 복사
COPY package.json package-lock.json ./

# 3. 의존성 설치 및 빌드
RUN npm install

COPY . .
RUN npm run build

# 4. 런타임 환경 설정
FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/next.config.js next.config.js

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
