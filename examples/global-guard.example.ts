import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MutationsGuard } from 'nestjs-mutations-guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: MutationsGuard,
    },
  ],
})
export class AppModule {
  // All routes in your application will now be protected by MutationsGuard
  // Set BLOCK_MUTATIONS=true to block all mutations globally
  // Use @AllowMutations() on specific routes to override
}