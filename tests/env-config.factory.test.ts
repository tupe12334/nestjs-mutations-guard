import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { EnvConfigFactory } from '../src/factories/env-config.factory';

describe('EnvConfigFactory', () => {
  let factory: EnvConfigFactory;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    factory = new EnvConfigFactory();
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return true when BLOCK_MUTATIONS is "true"', () => {
    process.env['BLOCK_MUTATIONS'] = 'true';

    expect(factory.shouldBlockMutations()).toBe(true);
  });

  it('should return false when BLOCK_MUTATIONS is "false"', () => {
    process.env['BLOCK_MUTATIONS'] = 'false';

    expect(factory.shouldBlockMutations()).toBe(false);
  });

  it('should return false when BLOCK_MUTATIONS is not set', () => {
    delete process.env['BLOCK_MUTATIONS'];

    expect(factory.shouldBlockMutations()).toBe(false);
  });

  it('should return false when BLOCK_MUTATIONS is any other value', () => {
    process.env['BLOCK_MUTATIONS'] = 'yes';

    expect(factory.shouldBlockMutations()).toBe(false);
  });
});