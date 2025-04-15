import { accessTokenKVP, refreshTokenKVP } from "@/config/storageKey";
import { AuthenticationResponse } from "@/types/responses/AuthenticationResponse";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
const refreshEndpoint = "/Account/RefreshToken";
const CHAT_URL = import.meta.env.VITE_CHAT_URL;
const USER_URL = import.meta.env.VITE_USER_URL;

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError | any) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}
// this to handle request that 401, wait for new token, to preven many refresh cdall, very good concept
let failedRequests: FailedRequests[] = [];
let isTokenRefreshing = false;

const createClient = (baseUrl: string): AxiosInstance => {
  const config: CreateAxiosDefaults = {
    baseURL: baseUrl,
    timeout: 60000,
    withCredentials: false,
  };
  const client = axios.create(config);
  client.interceptors.request.use(
    (successConfig: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(accessTokenKVP);
      if (token) {
        successConfig.headers.Authorization = `Bearer ${token}`;
      }
      return successConfig;
    },
    () => {}
  );
  client.interceptors.response.use(
    function onFulfill(res: AxiosResponse) {
      return res;
    },
    async function onError(err: AxiosError) {
      const { response } = err;
      const status = response?.status;
      const originalRequestConfig = err.config;
      // if (status == 401) {
      //   if (isTokenRefreshing) {
      //     return new Promise((resolve, reject) => {
      //       failedRequests.push({
      //         resolve,
      //         reject,
      //         config: originalRequestConfig,
      //         error: err,
      //       });
      //     });
      //   }
      //   isTokenRefreshing = true;

      //   try {
      //     let getRefreshToken = localStorage.getItem(refreshTokenKVP);
      //     let getNewTokenResponse = await client.put<AuthenticationResponse>(
      //       `${refreshEndpoint}?refreshToken=${getRefreshToken}`
      //     );
      //     const { accessToken = null, refreshToken = null } =
      //       getNewTokenResponse.data ?? {};
      //     if (!accessToken || !refreshToken) {
      //       throw new Error("Something went wrong while refreshing token");
      //     }
      //     localStorage.setItem(accessTokenKVP, accessToken);
      //     localStorage.setItem(refreshTokenKVP, refreshToken);
      //     failedRequests.forEach(({ resolve, reject, config }) => {
      //       client
      //         .request(config)
      //         .then((res) => {
      //           resolve(res);
      //         })
      //         .catch((err) => {
      //           reject(err);
      //         });
      //     });
      //   } catch (refreshErr) {
      //     console.error(refreshErr);
      //     localStorage.removeItem(accessTokenKVP);
      //     localStorage.removeItem(refreshTokenKVP);
      //     failedRequests.forEach((req) => {
      //       req.reject(refreshErr);
      //     });
      //     window.location.href = "/login";
      //   } finally {
      //     failedRequests = [];
      //     isTokenRefreshing = false;
      //   }
      //   return client(originalRequestConfig);
      // }
      return Promise.reject(err);
    }
  );
  return client;
};
const chatClient = createClient(CHAT_URL);
const userClient = createClient(USER_URL);
export const instances = {
  chatAxiosInstance: chatClient,
  userAxiosInstance: userClient,
};
