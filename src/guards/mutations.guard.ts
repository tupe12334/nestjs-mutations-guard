import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ALLOW_MUTATIONS_KEY, MUTATION_METHODS } from '../constants/metadata.constants';

@Injectable()
export class MutationsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAllowedByDecorator = this.reflector.getAllAndOverride<boolean>(
      ALLOW_MUTATIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAllowedByDecorator) {
      return true;
    }

    const blockMutations = this.getBlockMutationsFlag();

    if (!blockMutations) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method.toUpperCase();

    if (MUTATION_METHODS.includes(method as any)) {
      throw new ForbiddenException(
        `HTTP ${method} mutations are currently blocked. Use @AllowMutations() decorator to override.`,
      );
    }

    return true;
  }

  private getBlockMutationsFlag(): boolean {
    return process.env.BLOCK_MUTATIONS === 'true';
  }
}