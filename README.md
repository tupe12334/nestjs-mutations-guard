# NestJS Mutations Guard

A simple and lightweight NestJS package that provides a global guard to prevent HTTP mutation operations (POST, PUT, PATCH, DELETE) based on an environment flag, with decorator-based overrides.

## Features

- 🚫 **Block HTTP mutations** globally with a simple environment variable
- 🎯 **Override specific routes** with the `@AllowMutations()` decorator
- 🔧 **Zero configuration** - works out of the box
- ⚡ **Lightweight** - minimal performance impact
- 🛡️ **Type-safe** - full TypeScript support

## Installation

```bash
# npm
npm install nestjs-mutations-guard

# pnpm
pnpm add nestjs-mutations-guard

# yarn
yarn add nestjs-mutations-guard
```

## Quick Start

### 1. Simple Module Import (Recommended)

```typescript
import { Module } from '@nestjs/common';
import { MutationsGuardModule } from 'nestjs-mutations-guard';

@Module({
  imports: [MutationsGuardModule.register()], // That's it!
})
export class AppModule {}
```

### 2. Environment Configuration

```bash
# Block all mutations
BLOCK_MUTATIONS=true

# Allow all mutations (default)
BLOCK_MUTATIONS=false
```

### 3. Override Specific Routes

```typescript
import { AllowMutations } from 'nestjs-mutations-guard';

@Post()
@AllowMutations() // Always allows this route
createUser() { /* ... */ }
```

### 4. Custom Configuration Factory

```typescript
import { MutationsGuardModule, MutationsConfigFactory } from 'nestjs-mutations-guard';

class CustomConfigFactory implements MutationsConfigFactory {
  shouldBlockMutations(): boolean {
    // Your custom logic here
    return this.configService.get('MAINTENANCE_MODE') === 'true';
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
```

## 📁 Examples

For complete working examples, see the [`examples/`](./examples/) folder:

- **[`simple-module.example.ts`](./examples/simple-module.example.ts)** - Basic module import
- **[`app-with-module.example.ts`](./examples/app-with-module.example.ts)** - Complete app with controllers and decorators
- **[`custom-factory.example.ts`](./examples/custom-factory.example.ts)** - Custom configuration factories
- **[`basic-usage.example.ts`](./examples/basic-usage.example.ts)** - Individual guard usage
- **[`global-guard.example.ts`](./examples/global-guard.example.ts)** - Manual global guard setup

## How It Works

1. **Configuration Factory**: The guard uses a configurable factory to determine if mutations should be blocked
2. **Default behavior**: Uses `EnvConfigFactory` by default, which reads `BLOCK_MUTATIONS` environment variable
3. **Custom logic**: You can provide your own factory for complex logic (database, config service, feature flags, etc.)
4. **Override**: Routes decorated with `@AllowMutations()` always allow mutations regardless of the configuration
5. **Safe methods**: GET, HEAD, OPTIONS requests are never blocked

## API Reference

### `MutationsGuardModule`

A pre-configured module that automatically sets up the global mutations guard.

**Methods:**
- `register(options?)` - Set up the module with optional custom configuration factory
- `forRoot(options?)` - Alias for `register()`

```typescript
// Default setup (uses environment variable)
MutationsGuardModule.register()

// Custom factory
MutationsGuardModule.register({
  configFactory: new CustomConfigFactory()
})
```

### `MutationsConfigFactory`

Interface for creating custom configuration logic.

```typescript
interface MutationsConfigFactory {
  shouldBlockMutations(): boolean;
}
```

### `EnvConfigFactory`

Default factory that reads from `BLOCK_MUTATIONS` environment variable.

### `MutationsGuard`

The main guard class that implements the mutation blocking logic. Use this if you need manual setup or more control.

### `@AllowMutations()`

A decorator that marks a route or controller to always allow mutations, bypassing the global flag.

```typescript
// On a specific route
@Post()
@AllowMutations()
createUser() { /* ... */ }

// On an entire controller
@Controller('admin')
@AllowMutations()
export class AdminController { /* ... */ }
```

### Constants

- `MUTATION_METHODS`: `['POST', 'PUT', 'PATCH', 'DELETE']` - HTTP methods considered as mutations
- `ALLOW_MUTATIONS_KEY`: Metadata key used by the decorator

## Use Cases

- **Maintenance mode**: Temporarily disable all data modifications
- **Read-only deployments**: Ensure no data changes during specific deployments
- **Testing environments**: Create safe testing environments where mutations are controlled
- **Staging protection**: Prevent accidental data modifications in staging environments
- **Emergency mode**: Quick way to make your API read-only during incidents

## Error Response

When a mutation is blocked, the guard throws a `ForbiddenException` with a descriptive message:

```json
{
  "statusCode": 403,
  "message": "HTTP POST mutations are currently blocked. Use @AllowMutations() decorator to override."
}
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Build the package
pnpm build

# Lint code
pnpm lint

# Release (with automated changelog and publishing)
pnpm release

# Dry run release
pnpm release:dry
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
