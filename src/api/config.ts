import axios from "axios";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://40.82.136.44:8080";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 설정
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 처리
    return Promise.reject(error);
  }
);
