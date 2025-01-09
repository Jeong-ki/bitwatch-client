export interface CommonResData<Res = object> {
  message: string;
  status: number;
  result?: Res;
}
