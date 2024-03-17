interface BaseApiResponse {
  status: 'success' | 'fail' | 'error';
  message?: string | Array<string>;
}

interface JSendSuccessResponse extends BaseApiResponse {
  data?: any;
}

interface JSendFailedResponse extends BaseApiResponse {
  data?: {
    title?: string;
    body?: string;
  };
}

interface JSendErrorResponse extends BaseApiResponse {
  code?: number | string;
  data?: {
    type: string;
  };
}

export { JSendSuccessResponse, JSendFailedResponse, JSendErrorResponse };
