import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      // do something -->
      next();
    } else {
      const token = authorization.split(' ');
      console.log(token[1], 'Tokem');
      next();
    }
  }
}
