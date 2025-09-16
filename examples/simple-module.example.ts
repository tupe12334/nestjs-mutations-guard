import { Module } from '@nestjs/common';
import { MutationsGuardModule } from 'nestjs-mutations-guard';

@Module({
  imports: [
    // Simply import the module - that's it!
    // Uses EnvConfigFactory by default (reads BLOCK_MUTATIONS env var)
    MutationsGuardModule.register(),
  ],
})
export class AppModule {
  // All routes in your app are now protected by MutationsGuard
  // Set BLOCK_MUTATIONS=true to block all mutations globally
  // Use @AllowMutations() on specific routes to override
}