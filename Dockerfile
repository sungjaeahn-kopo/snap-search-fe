# 1. Node.js 환경 설정
FROM node:18 AS builder

# 2. 로컬 파일 복사
COPY package.json ./
# 3. 의존성 설치 및 빌드
RUN npm install

COPY . .
RUN npm run build

# 4. 런타임 환경 설정
FROM node:18 AS runner

COPY --from=builder /.next /.next
COPY --from=builder /public /public
COPY --from=builder /package.json /package.json
COPY --from=builder /next.config.js /next.config.js

RUN npm install --production

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
