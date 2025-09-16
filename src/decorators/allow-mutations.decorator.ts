import { SetMetadata } from '@nestjs/common';
import { ALLOW_MUTATIONS_KEY } from '../constants/metadata.constants';

export const AllowMutations = () => SetMetadata(ALLOW_MUTATIONS_KEY, true);