export interface StatusCode {
  ok: number;
  unauthorized: number;
  notFound: number;
  internalServerError: number;
  badRequest: number;
  created: number;
}

export interface PrivateAndPublicMessages {
  ok: string;
  unauthorized: string;
  notFound: string;
  internalServerError: string;
  badRequest: string;
  created: string;
}
