interface BaseApiResponse {
  status: 'success' | 'fail' | 'error';
  message?: string | Array<string>;
}

interface JSendSuccessResponse extends BaseApiResponse {
  data?: any;
}

interface JSendFailedResponse extends BaseApiResponse {
  data?: any;
}

interface JSendErrorResponse extends BaseApiResponse {
  code?: number | string;
  data?: any;
}

export { JSendSuccessResponse, JSendFailedResponse, JSendErrorResponse };
