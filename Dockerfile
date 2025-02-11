# React 빌드용 Node.js 환경
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Nginx 설정 경로 변경
FROM nginx:stable-alpine
RUN mkdir -p /var/www/build
COPY --from=builder /app/build /var/www/build
RUN sed -i 's|/usr/share/nginx/html|/var/www/build|g' /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
