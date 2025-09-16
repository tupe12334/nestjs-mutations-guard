import { Injectable } from '@nestjs/common';
import { MutationsConfigFactory } from '../interfaces/mutations-config.interface';

@Injectable()
export class EnvConfigFactory implements MutationsConfigFactory {
  shouldBlockMutations(): boolean {
    const env = process.env;
    return env['BLOCK_MUTATIONS'] === 'true';
  }
}