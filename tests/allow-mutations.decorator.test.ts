import { SetMetadata } from '@nestjs/common';
import { AllowMutations } from '../src/decorators/allow-mutations.decorator';
import { ALLOW_MUTATIONS_KEY } from '../src/constants/metadata.constants';

jest.mock('@nestjs/common', () => ({
  SetMetadata: jest.fn(),
}));

describe('AllowMutations decorator', () => {
  it('should call SetMetadata with correct parameters', () => {
    const setMetadataSpy = jest.mocked(SetMetadata);

    AllowMutations();

    expect(setMetadataSpy).toHaveBeenCalledWith(ALLOW_MUTATIONS_KEY, true);
  });
});