import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MutationsGuard } from './mutations.guard';
import { ALLOW_MUTATIONS_KEY } from '../constants/metadata.constants';
import { MutationsConfigFactory } from '../interfaces/mutations-config.interface';

describe('MutationsGuard Unit Tests', () => {
  let guard: MutationsGuard;
  let reflector: Reflector;
  let mockConfigFactory: MutationsConfigFactory;

  beforeEach(() => {
    reflector = new Reflector();
    mockConfigFactory = {
      shouldBlockMutations: vi.fn(),
    };

    // Create guard instance directly with mocks
    guard = new MutationsGuard(reflector, mockConfigFactory);
  });

  const createMockContext = (method: string): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ method }),
        getResponse: () => ({}),
        getNext: () => ({}),
      }),
      getHandler: () => ({}) as any,
      getClass: () => ({}) as any,
      getArgs: () => [],
      getArgByIndex: () => ({}),
      switchToRpc: () => ({}) as any,
      switchToWs: () => ({}) as any,
      getType: () => 'http',
    } as ExecutionContext;
  };

  describe('Basic Functionality', () => {
    it('should be defined', () => {
      expect(guard).toBeDefined();
    });

    it('should allow GET requests when mutations are blocked', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const context = createMockContext('GET');
      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
        ALLOW_MUTATIONS_KEY,
        [context.getHandler(), context.getClass()]
      );
    });

    it('should allow all requests when mutations are not blocked', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(false);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const context = createMockContext('POST');
      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should block POST requests when mutations are blocked', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const context = createMockContext('POST');

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should allow POST requests with @AllowMutations decorator', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const context = createMockContext('POST');
      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('HTTP Methods Coverage', () => {
    beforeEach(() => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    });

    const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];
    const MUTATION_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
    const OTHER_METHODS = ['CONNECT', 'COPY', 'SEARCH', 'SUBSCRIBE'];

    describe('Safe Methods', () => {
      SAFE_METHODS.forEach(method => {
        it(`should allow ${method} requests`, () => {
          const context = createMockContext(method);
          const result = guard.canActivate(context);
          expect(result).toBe(true);
        });
      });
    });

    describe('Mutation Methods', () => {
      MUTATION_METHODS.forEach(method => {
        it(`should block ${method} requests`, () => {
          const context = createMockContext(method);
          expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
        });
      });
    });

    describe('Other Methods', () => {
      OTHER_METHODS.forEach(method => {
        it(`should allow ${method} requests (not mutation)`, () => {
          const context = createMockContext(method);
          const result = guard.canActivate(context);
          expect(result).toBe(true);
        });
      });
    });

    it('should handle case-insensitive HTTP methods', () => {
      const context = createMockContext('post');
      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should provide correct error message', () => {
      const context = createMockContext('POST');

      try {
        guard.canActivate(context);
        expect(true).toBe(false); // Should not reach here
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(ForbiddenException);
        if (error instanceof Error) {
          expect(error.message).toBe(
            'HTTP POST mutations are currently blocked. Use @AllowMutations() decorator to override.'
          );
        }
      }
    });
  });

  describe('Configuration Factory Integration', () => {
    it('should call shouldBlockMutations from config factory', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(false);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const context = createMockContext('POST');
      guard.canActivate(context);

      expect(mockConfigFactory.shouldBlockMutations).toHaveBeenCalled();
    });

    it('should respect config factory decision when blocking is disabled', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(false);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const context = createMockContext('DELETE');
      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should respect config factory decision when blocking is enabled', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

      const context = createMockContext('DELETE');

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  describe('Decorator Override', () => {
    it('should prioritize @AllowMutations decorator over config factory', () => {
      vi.mocked(mockConfigFactory.shouldBlockMutations).mockReturnValue(true);
      vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const context = createMockContext('DELETE');
      const result = guard.canActivate(context);

      expect(result).toBe(true);
      // Config factory should not be called if decorator allows
      expect(mockConfigFactory.shouldBlockMutations).not.toHaveBeenCalled();
    });
  });
});