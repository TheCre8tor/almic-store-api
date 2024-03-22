import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Roles } from '../utilities/user-roles.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>(
      'allowedRoles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();

    const user: UserEntity | null = request?.currentUser;

    const roles = Object.values(user?.roles);

    const result = roles
      .map((role: string) => allowedRoles.includes(role))
      .find((value: boolean) => value === true);

    if (result) return true;

    throw new UnauthorizedException('Sorry, you are not authorized');
  }
}
