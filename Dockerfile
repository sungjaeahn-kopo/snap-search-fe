# 1. Node.js 환경 설정
FROM node:18 AS builder

# 2. 로컬 파일 복사
COPY . / 

# 3. 의존성 설치 및 빌드
RUN npm install
RUN npm run build

# 4. 런타임 환경 설정
FROM node:18 AS runner

# 5. 빌드 결과물 및 필요한 파일 복사
COPY --from=builder /.next /.next
COPY --from=builder /package.json /package.json
COPY --from=builder /next.config.js /next.config.js
COPY --from=builder /tsconfig.json /tsconfig.json
COPY --from=builder /public /public
COPY --from=builder /.env.production /.env.production

# 6. 의존성 설치 (프로덕션 환경)
RUN npm install

# 7. 포트 노출
EXPOSE 3000

# 8. Next.js 서버 실행
CMD ["npm", "start"]
