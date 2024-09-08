
export type ApiResponse<T> = {
  data: T;
  errros: T;
  message?: string;
  status: boolean;
};
