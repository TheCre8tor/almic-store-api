import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from '../service/users.service';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { UserEntity } from '../entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
    private readonly logger: PinoLogger,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      req.currentUser = null;
      next();
    } else {
      const token = authorization.split(' ')[1];

      try {
        const { id } = verify(
          token,
          this.config.get('APP_APPLICATION__ACCESS_TOKEN_SECRET_KEY'),
        ) as JwtPayload;

        const currentUser = await this.usersService.getUser(id);

        req.currentUser = currentUser;

        next();
        return;
      } catch (error) {
        this.logger.error(error);
        req.currentUser = null;
        next();
      }
    }
  }
}

interface JwtPayload {
  id: string;
}
