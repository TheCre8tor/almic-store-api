import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { pino } from 'pino';
import { v4 as uuidv4 } from 'uuid';

export default (config: ConfigService) => ({
  pinoHttp: {
    autoLogging: true,
    level: config.get('LOG_LEVEL') || 'info',
    genReqId: (request: Request) => {
      return request.headers['x-correlation-id'] || uuidv4();
    },
    serializers: {
      req: pino.stdSerializers.wrapRequestSerializer((request) => {
        delete request.headers['authorization'];
        return request;
      }),
    },
  },
});
