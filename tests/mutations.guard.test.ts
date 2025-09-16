import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MutationsGuard } from '../src/guards/mutations.guard';
import { ALLOW_MUTATIONS_KEY, MUTATIONS_CONFIG_TOKEN } from '../src/constants/metadata.constants';
import { MutationsConfigFactory } from '../src/interfaces/mutations-config.interface';

describe('MutationsGuard', () => {
  let guard: MutationsGuard;
  let reflector: Reflector;
  let mockConfigFactory: MutationsConfigFactory;

  beforeEach(async () => {
    mockConfigFactory = {
      shouldBlockMutations: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutationsGuard,
        Reflector,
        {
          provide: MUTATIONS_CONFIG_TOKEN,
          useValue: mockConfigFactory,
        },
      ],
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
    } as ExecutionContext;
  };

  describe('when mutations are not blocked', () => {
    beforeEach(() => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(false);
    });

    it('should allow all requests', () => {
      const context = createMockContext('POST');
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('when mutations are blocked', () => {
    beforeEach(() => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
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
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
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