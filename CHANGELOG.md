# Changelog

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