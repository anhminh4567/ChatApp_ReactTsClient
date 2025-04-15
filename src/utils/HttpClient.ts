import { instances } from "./AxiosInstant";

export const ChatHttpClient = {
  get: instances.chatAxiosInstance.get,
  post: instances.chatAxiosInstance.post,
  put: instances.chatAxiosInstance.put,
  delete: instances.chatAxiosInstance.delete,
  patch: instances.chatAxiosInstance.patch,
  postForm: instances.chatAxiosInstance.postForm,
};
export const UserHttpClient = {
  get: instances.userAxiosInstance.get,
  post: instances.userAxiosInstance.post,
  put: instances.userAxiosInstance.put,
  delete: instances.userAxiosInstance.delete,
  patch: instances.userAxiosInstance.patch,
  postForm: instances.userAxiosInstance.postForm,
};
