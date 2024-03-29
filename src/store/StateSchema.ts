import { IAuthData } from "@/features/Auth/modal/type/userSchema";

export interface StateSchema {
  loginForm: IDataStoreStateType<IAuthData>;
}

export interface IDataStoreStateType<T> {
  fulfilled: boolean;
  loading: boolean;
  data?: T;
  error: string | undefined;
}
