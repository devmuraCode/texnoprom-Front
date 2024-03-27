export interface IAuthSchema {
  userInfo: IAuthData;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
}

export interface IAuthData {
  access: string;
  refresh: string;
}
