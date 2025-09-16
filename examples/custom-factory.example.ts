import { Injectable, Module } from '@nestjs/common';
import { MutationsGuardModule, MutationsConfigFactory } from 'nestjs-mutations-guard';

// Custom factory that reads from database, config service, etc.
@Injectable()
export class CustomConfigFactory implements MutationsConfigFactory {
  constructor(
    // Inject your config service, database service, etc.
    // private configService: ConfigService,
    // private dbService: DatabaseService,
  ) {}

  shouldBlockMutations(): boolean {
    // Custom logic - read from database, config service, feature flags, etc.
    // return this.configService.get('MAINTENANCE_MODE') === 'true';
    // return this.dbService.isMaintenanceMode();

    // Example: time-based blocking
    const now = new Date();
    const isMaintenanceHour = now.getHours() >= 2 && now.getHours() <= 4;
    return isMaintenanceHour;
  }
}

// Example: Config service factory
@Injectable()
export class ConfigServiceFactory implements MutationsConfigFactory {
  // constructor(private configService: ConfigService) {}

  shouldBlockMutations(): boolean {
    // Read from your configuration system
    // return this.configService.get<boolean>('features.blockMutations', false);
    return false; // placeholder
  }
}

// Example: Feature flag factory
@Injectable()
export class FeatureFlagFactory implements MutationsConfigFactory {
  // constructor(private featureFlags: FeatureFlagService) {}

  shouldBlockMutations(): boolean {
    // Use feature flag service
    // return this.featureFlags.isEnabled('block-mutations');
    return false; // placeholder
  }
}

@Module({
  imports: [
    MutationsGuardModule.register({
      configFactory: new CustomConfigFactory(),
    }),
  ],
})
export class AppModule {}

/*
Other examples:

// 1. Using forRoot (alias for register)
MutationsGuardModule.forRoot({
  configFactory: new ConfigServiceFactory(),
})

// 2. Time-based blocking
class TimeBasedFactory implements MutationsConfigFactory {
  shouldBlockMutations(): boolean {
    const now = new Date();
    return now.getHours() >= 2 && now.getHours() <= 4; // Block 2-4 AM
  }
}

// 3. Environment-based with custom logic
class EnvironmentFactory implements MutationsConfigFactory {
  shouldBlockMutations(): boolean {
    const env = process.env['NODE_ENV'];
    const blockFlag = process.env['BLOCK_MUTATIONS'];

    // Always allow in development
    if (env === 'development') return false;

    // In production, respect the flag
    return blockFlag === 'true';
  }
}
*/