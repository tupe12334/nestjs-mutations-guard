import { Module } from '@nestjs/common';
import { MutationsGuardModule } from 'nestjs-mutations-guard';
import { UsersController } from './users.controller';

@Module({
  imports: [
    // Simply import the module - that's it!
    MutationsGuardModule,
  ],
  controllers: [UsersController],
})
export class AppModule {
  // All routes in your app are now protected by MutationsGuard
  // Set BLOCK_MUTATIONS=true to block all mutations globally
  // Use @AllowMutations() on specific routes to override
}