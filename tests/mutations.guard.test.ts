import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MutationsGuard } from '../src/guards/mutations.guard';
import { ALLOW_MUTATIONS_KEY } from '../src/constants/metadata.constants';

describe('MutationsGuard', () => {
  let guard: MutationsGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutationsGuard, Reflector],
    }).compile();

    guard = module.get<MutationsGuard>(MutationsGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  const createMockContext = (method: string): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ method }),
      }),
      getHandler: vi.fn(),
      getClass: vi.fn(),
    } as any;
  };

  describe('when BLOCK_MUTATIONS is false', () => {
    beforeEach(() => {
      process.env.BLOCK_MUTATIONS = 'false';
    });

    it('should allow all requests', () => {
      const context = createMockContext('POST');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('when BLOCK_MUTATIONS is true', () => {
    beforeEach(() => {
      process.env.BLOCK_MUTATIONS = 'true';
    });

    it('should allow GET requests', () => {
      const context = createMockContext('GET');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should block POST requests', () => {
      const context = createMockContext('POST');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should block PUT requests', () => {
      const context = createMockContext('PUT');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should block PATCH requests', () => {
      const context = createMockContext('PATCH');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should block DELETE requests', () => {
      const context = createMockContext('DELETE');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should allow mutation requests when @AllowMutations decorator is present', () => {
      const context = createMockContext('POST');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should handle case-insensitive HTTP methods', () => {
      const context = createMockContext('post');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should throw proper error message', () => {
      const context = createMockContext('POST');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      try {
        guard.canActivate(context);
      } catch (error) {
        expect(error.message).toBe(
          'HTTP POST mutations are currently blocked. Use @AllowMutations() decorator to override.',
        );
      }
    });
  });

  describe('reflector metadata handling', () => {
    beforeEach(() => {
      process.env.BLOCK_MUTATIONS = 'true';
    });

    it('should call reflector with correct parameters', () => {
      const context = createMockContext('POST');
      const spy = vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      try {
        guard.canActivate(context);
      } catch (error) {
        // Expected to throw
      }

      expect(spy).toHaveBeenCalledWith(ALLOW_MUTATIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });
  });
});