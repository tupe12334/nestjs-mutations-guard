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

### 1. Basic Usage

```typescript
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MutationsGuard, AllowMutations } from 'nestjs-mutations-guard';

@Controller('users')
@UseGuards(MutationsGuard)
export class UsersController {
  @Get()
  findAll() {
    // GET requests are always allowed
    return { users: [] };
  }

  @Post()
  create() {
    // This will be blocked when BLOCK_MUTATIONS=true
    return { message: 'User created' };
  }

  @Post('special')
  @AllowMutations()
  createSpecial() {
    // This will ALWAYS work, even when BLOCK_MUTATIONS=true
    return { message: 'Special user created' };
  }
}
```

### 2. Simple Module Import (Recommended)

```typescript
import { Module } from '@nestjs/common';
import { MutationsGuardModule } from 'nestjs-mutations-guard';

@Module({
  imports: [
    // Simply import the module - that's it!
    MutationsGuardModule,
  ],
  controllers: [/* your controllers */],
})
export class AppModule {}
```

### 3. Manual Global Guard Setup

```typescript
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
export class AppModule {}
```

### 4. Environment Configuration

Set the environment variable to control mutation blocking:

```bash
# Block all mutations
BLOCK_MUTATIONS=true

# Allow all mutations (default behavior)
BLOCK_MUTATIONS=false
```

## How It Works

1. **Default behavior**: When `BLOCK_MUTATIONS` is not set or is `false`, all requests pass through normally
2. **Blocking mode**: When `BLOCK_MUTATIONS=true`, the guard blocks all POST, PUT, PATCH, and DELETE requests
3. **Override**: Routes decorated with `@AllowMutations()` always allow mutations regardless of the flag
4. **Safe methods**: GET, HEAD, OPTIONS requests are never blocked

## API Reference

### `MutationsGuardModule`

A pre-configured module that automatically sets up the global mutations guard. Simply import this module into your app module.

```typescript
imports: [MutationsGuardModule]
```

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