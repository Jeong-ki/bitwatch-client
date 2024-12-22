export interface CommonResData<Res = object> {
  code?: number;
  message?: string;
  result?: Res;
  status: number;
}
