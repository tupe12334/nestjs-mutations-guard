import { SetMetadata } from '@nestjs/common';
import { describe, it, expect, vi } from 'vitest';
import { AllowMutations } from './allow-mutations.decorator';
import { ALLOW_MUTATIONS_KEY } from '../constants/metadata.constants';

vi.mock('@nestjs/common', () => ({
  SetMetadata: vi.fn(),
}));

describe('AllowMutations decorator', () => {
  it('should call SetMetadata with correct parameters', () => {
    const setMetadataSpy = vi.mocked(SetMetadata);

    AllowMutations();

    expect(setMetadataSpy).toHaveBeenCalledWith(ALLOW_MUTATIONS_KEY, true);
  });
});