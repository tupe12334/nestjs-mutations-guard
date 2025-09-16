import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW_MUTATIONS_KEY, MUTATION_METHODS, MUTATIONS_CONFIG_TOKEN } from '../constants/metadata.constants';
import { MutationsConfigFactory } from '../interfaces/mutations-config.interface';


@Injectable()
export class MutationsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(MUTATIONS_CONFIG_TOKEN) private configFactory: MutationsConfigFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isAllowedByDecorator = this.reflector.getAllAndOverride<boolean>(
      ALLOW_MUTATIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAllowedByDecorator) {
      return true;
    }

    const blockMutations = this.configFactory.shouldBlockMutations();

    if (!blockMutations) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ method: string }>();
    const method = request.method.toUpperCase();

    const mutationMethods: readonly string[] = MUTATION_METHODS;
    const isMutationMethod = mutationMethods.includes(method);
    if (isMutationMethod) {
      throw new ForbiddenException(
        `HTTP ${method} mutations are currently blocked. Use @AllowMutations() decorator to override.`,
      );
    }

    return true;
  }
}