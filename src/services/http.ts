import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import merge from 'lodash/merge';
import toast from 'react-hot-toast';

enum StatusCode {
   Unauthorized = 401,
   Forbidden = 403,
   TooManyRequests = 429,
   InternalServerError = 500
}

class Http {
   // @ts-ignore
   private instance: AxiosInstance;

   private defaults: AxiosRequestConfig = {
      baseURL: "http://172.20.10.3:8000",
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json; charset=utf-8'
      }
   };

   private get http(): AxiosInstance {
      return this.instance != null ? this.instance : this.init();
   }

   public init({ config, configFn }: {
      config?: AxiosRequestConfig;
      configFn?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
   } = {}) {
      const http = axios.create(merge(this.defaults, config));

      http.interceptors.request.use(
         // @ts-ignore
         (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
            if (configFn) {
               const requestConfig = configFn(config);

               if (requestConfig instanceof Promise) {
                  return requestConfig.then(newConfig => Promise.resolve(merge(config, newConfig)));
               }

               return merge(config, requestConfig || {});
            }

            return config;
         },
         error => {
            console.error("Ошибка при отправке запроса:", error);
            toast.error("Ошибка при отправке запроса.");
            return Promise.reject(error);
         }
      );

      http.interceptors.response.use(
         response => response,
         error => {
            const { response } = error;
            return Http.handleError(response);
         }
      );

      this.instance = http;
      return http;
   }

   public get request(): AxiosInstance {
      return this.http;
   }
// @ts-ignore
   private static handleError(error) {
      const { status } = error || {};

      switch (status) {
         case StatusCode.InternalServerError: {
            toast.error("Внутренняя ошибка сервера.");
            break;
         }
         case StatusCode.Forbidden: {
            toast.error("Доступ запрещен.");
            break;
         }
         case StatusCode.Unauthorized: {
            toast.error("Неавторизованный доступ.");
            localStorage.clear();
            break;
         }
         case StatusCode.TooManyRequests: {
            toast.error("Слишком много запросов. Пожалуйста, попробуйте позже.");
            break;
         }
         default: {
            console.error(`Ошибка: ${status}`);
            break;
         }
      }

      return Promise.reject(error);
   }
}

export default new Http();
