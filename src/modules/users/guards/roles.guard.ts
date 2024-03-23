import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

export const AuthorizationGuardMixin = (allowedRoles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
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

  const guard = mixin(RolesGuardMixin);

  return guard;
};
