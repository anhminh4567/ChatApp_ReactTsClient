/* eslint-disable prefer-const */
import { accessTokenKVP, refreshTokenKVP } from "@/config/storageKey";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import { User } from "oidc-client-ts";
import { useAuth } from "react-oidc-context";
// const refreshEndpoint = "/Account/RefreshToken";
const CHAT_URL = import.meta.env.VITE_CHAT_URL;
const USER_URL = import.meta.env.VITE_USER_URL;
const USER_KVP = `oidc.user:${import.meta.env.VITE_AWS_AUTHORITY}:${
  import.meta.env.VITE_AWS_CLIENT_ID
}`;
interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError | never) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}
// this to handle request that 401, wait for new token, to preven many refresh cdall, very good concept
const failedRequests: FailedRequests[] = [];
const isTokenRefreshing = false;
function getUserFromContextOIDC() {
  const oidcStorage = localStorage.getItem(USER_KVP);
  if (!oidcStorage) {
    return null;
  }
  const user = User.fromStorageString(oidcStorage);
  return user;
}
const createClient = (baseUrl: string): AxiosInstance => {
  const config: CreateAxiosDefaults = {
    baseURL: baseUrl,
    timeout: 60000,
    withCredentials: false,
  };
  const client = axios.create(config);
  client.interceptors.request.use(
    (successConfig: InternalAxiosRequestConfig) => {
      console.log(USER_KVP);
      let user = getUserFromContextOIDC();
      console.log(user);
      let accessToken = user?.access_token; //window.localStorage.getItem(accessTokenKVP);
      if (accessToken) {
        successConfig.headers.Authorization = `Bearer ${accessToken}`;
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
