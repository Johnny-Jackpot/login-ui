export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  generalError?: string | null;
};

export type ErrorDetail = {
  field_name: string;
  error: string;
}

export type Credentials = {
  error: number;
  detail: Array<any>;
  timestamp: number;
  access_token: string
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}
