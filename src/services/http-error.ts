export class HttpError extends Error {
  code: string;
  statusCode: number;
  data: unknown;

  constructor(message: string, code: string, statusCode: number = 500, data: unknown = null) {
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default HttpError;
