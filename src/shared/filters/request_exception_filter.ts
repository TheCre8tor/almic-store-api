import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import {
  JSendErrorResponse,
  JSendFailedResponse,
} from 'src/shared/core/api.response';

class RequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const hostResponse = context.getResponse<Response>();
    const status = exception.getStatus();
    const response = exception.getResponse() as Array<string> | string;

    if (status >= 500) {
      let data: JSendErrorResponse = {
        status: 'error',
        message: response['message'],
      };

      return hostResponse.status(status).json(data);
    }

    let isSinleMessage = response['message'][0].length == 1;
    let message: string = isSinleMessage
      ? response['message']
      : response['message'][0];

    const data: JSendFailedResponse = {
      status: 'fail',
      message: message,
      data: {
        title: response['error'],
        reasons: response['message'],
      },
    };

    hostResponse.status(status).json(data);
  }
}

export { RequestExceptionFilter };
