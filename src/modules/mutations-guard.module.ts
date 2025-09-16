import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MutationsGuard } from '../guards/mutations.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: MutationsGuard,
    },
  ],
})
export class MutationsGuardModule {}