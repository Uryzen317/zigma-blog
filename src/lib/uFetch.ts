import axios, { AxiosResponse } from "axios";
import { env } from "./public-env";
import uSonner from "./uSonner.lib";

export function uGet<T>(
  path: string,
  options: {
    setIsLoading?: (mode: boolean) => void;
    withCredentials?: boolean;
    preventSonner?: boolean;
  } = {}
): Promise<T> {
  if (options.setIsLoading) {
    options.setIsLoading(true);
  }

  return new Promise((resolve, reject) => {
    axios
      .get(`${env.API}${path}`, {
        withCredentials: options?.withCredentials,
      })
      .then((res: AxiosResponse<T>) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (!options.preventSonner) uSonner("خطا", err.message);
        reject(err);
      })
      .finally(() => {
        if (options.setIsLoading) {
          options.setIsLoading(false);
        }
      });
  });
}

export function uPost<T>(
  path: string,
  data: any,
  options: {
    setIsLoading?: (mode: boolean) => void;
    withCredentials?: boolean;
    preventSonner?: boolean;
  } = {}
): Promise<T> {
  if (options.setIsLoading) {
    options.setIsLoading(true);
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${env.API}${path}`, data, {
        withCredentials: options?.withCredentials,
      })
      .then((res: AxiosResponse<T>) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (!options.preventSonner) uSonner("خطا", err.message);
        reject(err);
      })
      .finally(() => {
        if (options.setIsLoading) {
          options.setIsLoading(false);
        }
      });
  });
}

export function uDel<T>(
  path: string,
  options: {
    setIsLoading?: (mode: boolean) => void;
    withCredentials?: boolean;
    preventSonner?: boolean;
  } = {}
): Promise<T> {
  if (options.setIsLoading) {
    options.setIsLoading(true);
  }

  return new Promise((resolve, reject) => {
    axios
      .delete(`${env.API}${path}`, {
        withCredentials: options?.withCredentials,
      })
      .then((res: AxiosResponse<T>) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (!options.preventSonner) uSonner("خطا", err.message);
        reject(err);
      })
      .finally(() => {
        if (options.setIsLoading) {
          options.setIsLoading(false);
        }
      });
  });
}

export function uPatch<T>(
  path: string,
  data: any,
  options: {
    setIsLoading?: (mode: boolean) => void;
    withCredentials?: boolean;
    preventSonner?: boolean;
  } = {}
): Promise<T> {
  if (options.setIsLoading) {
    options.setIsLoading(true);
  }

  return new Promise((resolve, reject) => {
    axios
      .patch(`${env.API}${path}`, data, {
        withCredentials: options?.withCredentials,
      })
      .then((res: AxiosResponse<T>) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (!options.preventSonner) uSonner("خطا", err.message);
        reject(err);
      })
      .finally(() => {
        if (options.setIsLoading) {
          options.setIsLoading(false);
        }
      });
  });
}

export default {
  uGet,
  uPost,
};
