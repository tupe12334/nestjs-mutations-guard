# Changelog

## 1.1.0 (2025-09-16)

### Features

* add MutationsGuardModule for simplified global guard setup and update examples in README ([24bfade](https://github.com/tupe12334/nestjs-mutations-guard/commit/24bfadebcdc3890c8466af1d75657ada66f38fee))
* add NestJS mutations guard with decorator support and configuration options ([5973095](https://github.com/tupe12334/nestjs-mutations-guard/commit/597309517352e040b9c27528464ec0f9697816a2))
* configure release-it to read tokens from .env file and exclude test files from build ([0dcb895](https://github.com/tupe12334/nestjs-mutations-guard/commit/0dcb895e3e6dcb4bf5ef4932484f098b084f649a))
* implement custom configuration factory for MutationsGuard and update README ([d372c89](https://github.com/tupe12334/nestjs-mutations-guard/commit/d372c89187792f8750559656473c627232148f80))
* migrate ESLint configuration to eslint.config.js and remove old .eslintrc.js ([84e2a43](https://github.com/tupe12334/nestjs-mutations-guard/commit/84e2a434ab08624e7b00dbb02aee5a4feb51e897))
* update examples to use MutationsGuardModule.register() for global route protection ([54c7e19](https://github.com/tupe12334/nestjs-mutations-guard/commit/54c7e1949ab4501939077d2e034f3454504e9cd2))
* update project configuration and testing framework to use Vitest ([df2b953](https://github.com/tupe12334/nestjs-mutations-guard/commit/df2b953a61403edd9efa448cdbd707cbc085335c))

### Bug Fixes

* add missing newline at end of README.md ([8aec268](https://github.com/tupe12334/nestjs-mutations-guard/commit/8aec268922193a50c5f21c08a5ea0384d7877ea2))

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of NestJS Mutations Guard
- Global guard to prevent HTTP mutations (POST, PUT, PATCH, DELETE)
- `@AllowMutations()` decorator for selective override
- Factory pattern for flexible configuration
- Environment variable support (`BLOCK_MUTATIONS`)
- Custom configuration factory interface
- Comprehensive HTTP methods coverage
- TypeScript support with full type safety
- Complete test coverage
- Usage examples and documentation

### Features
- **MutationsGuard**: Main guard class for HTTP method blocking
- **MutationsGuardModule**: Pre-configured module with `register()` and `forRoot()` methods
- **@AllowMutations()**: Decorator to bypass guard on specific routes/controllers
- **MutationsConfigFactory**: Interface for custom configuration logic
- **EnvConfigFactory**: Default factory reading from environment variables
- **Complete HTTP method support**: Handles all standard HTTP methods correctly
- **Case-insensitive**: Works with any case HTTP method names
- **Zero configuration**: Works out of the box with environment variables
- **Flexible configuration**: Support for custom configuration sources

### Technical Details
- Built with TypeScript 5.0+
- Compatible with NestJS 9.0+ and 10.0+
- Uses pnpm for package management
- Vitest for testing
- ESLint with strict rules
- Automated releases with release-it

## [1.0.0] - 2024-XX-XX

### Added
- Initial public release
- Core mutations guard functionality
- Comprehensive documentation
- Example implementations
- Full test coverage

---

*This changelog is automatically updated by release-it*
