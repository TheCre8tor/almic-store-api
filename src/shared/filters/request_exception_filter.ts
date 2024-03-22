import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  JSendErrorResponse,
  JSendFailedResponse,
} from 'src/shared/core/api.response';

import { pino } from 'pino';

const logger = pino();

@Catch()
class RequestExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Oops! something went wrong!' };

    if (status >= 500) {
      logger.error({
        message: 'Internal server error',
        error: context.getResponse()['err'],
      });

      let data: JSendErrorResponse = {
        status: 'error',
        message: response['message'],
      };

      return httpAdapter.reply(context.getResponse(), data, status);
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

    httpAdapter.reply(context.getResponse(), data, status);
  }
}

export { RequestExceptionFilter };
