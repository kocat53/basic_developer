import axios, { type AxiosInstance, isAxiosError } from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// axios 인스턴스 설정
const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60_000,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // cors관련
});

// 요청 인터셉터 셋팅
instance.interceptors.request.use(config => {
  // 요청전 토큰설정
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 오류 응답을 처리하는 로직 (예: 오류 메시지 표시)
    if (isAxiosError(error)) {
      return Promise.reject(error);
    }
    return Promise.reject(error); // AxiosError가 아닌 경우도 처리해야 합니다.
  }
);

export default instance;
