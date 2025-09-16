import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MutationsGuard } from '../guards/mutations.guard';
import { EnvConfigFactory } from '../factories/env-config.factory';
import { MutationsModuleOptions } from '../interfaces/mutations-module-options.interface';
import { MUTATIONS_CONFIG_TOKEN } from '../constants/metadata.constants';

@Module({})
export class MutationsGuardModule {
  static register(options?: MutationsModuleOptions): DynamicModule {
    const configFactory = options && options.configFactory ? options.configFactory : new EnvConfigFactory();

    return {
      module: MutationsGuardModule,
      providers: [
        {
          provide: MUTATIONS_CONFIG_TOKEN,
          useValue: configFactory,
        },
        {
          provide: APP_GUARD,
          useClass: MutationsGuard,
        },
      ],
    };
  }

  static forRoot(options?: MutationsModuleOptions): DynamicModule {
    return this.register(options);
  }
}