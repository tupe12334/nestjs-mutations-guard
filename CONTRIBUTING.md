# Contributing to NestJS Mutations Guard

Thank you for your interest in contributing to NestJS Mutations Guard! We welcome contributions from the community.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/nestjs-mutations-guard.git
   cd nestjs-mutations-guard
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Run tests to ensure everything works:
   ```bash
   pnpm test
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Build the package
pnpm build
```

### Project Structure

```
src/
├── constants/        # Constants and metadata keys
├── decorators/       # NestJS decorators
├── factories/        # Configuration factory implementations
├── guards/           # Main guard implementation
├── interfaces/       # TypeScript interfaces
└── modules/          # NestJS modules

tests/                # Test files
examples/             # Usage examples
```

## Contributing Guidelines

### Code Style

- Follow existing code patterns
- Use TypeScript strict mode
- Add JSDoc comments for public APIs
- Ensure all code passes ESLint checks

### Testing

- Write tests for all new functionality
- Maintain 100% test coverage for critical paths
- Include both unit and integration tests
- Test edge cases and error conditions

### Commit Messages

Use conventional commit format:

```
type(scope): description

Examples:
feat(guard): add support for custom HTTP methods
fix(decorator): resolve metadata key collision
docs(readme): update installation instructions
test(guard): add comprehensive HTTP methods coverage
```

### Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Add tests** for your changes

4. **Ensure all checks pass**:
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

5. **Update documentation** if needed

6. **Submit a pull request** with:
   - Clear description of changes
   - Reference to any related issues
   - Screenshots/examples if applicable

### Pull Request Requirements

- [ ] All tests pass
- [ ] Code follows project conventions
- [ ] New functionality includes tests
- [ ] Documentation is updated
- [ ] No breaking changes (or clearly documented)

## Types of Contributions

### Bug Reports

When reporting bugs, please include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (Node.js version, NestJS version, etc.)
- **Code examples** demonstrating the issue

### Feature Requests

For new features:

- **Explain the use case** and motivation
- **Provide examples** of how it would work
- **Consider backward compatibility**
- **Discuss implementation approach**

### Code Contributions

We welcome contributions for:

- **Bug fixes**
- **New features** (please discuss in an issue first)
- **Performance improvements**
- **Documentation enhancements**
- **Test coverage improvements**

## Development Guidelines

### Adding New Features

1. **Discuss first**: Open an issue to discuss new features before implementing
2. **Keep it simple**: Follow the principle of least surprise
3. **Maintain compatibility**: Avoid breaking changes when possible
4. **Add examples**: Include usage examples in the `examples/` directory

### Modifying Existing Features

1. **Consider impact**: Think about backward compatibility
2. **Update tests**: Ensure existing tests still pass or update them appropriately
3. **Update docs**: Keep documentation in sync with changes

### Performance Considerations

- **Minimize overhead**: The guard should have minimal performance impact
- **Avoid blocking operations**: Keep the guard logic fast and synchronous
- **Memory efficiency**: Be mindful of memory usage in hot paths

## Release Process

Releases are handled by maintainers using:

```bash
pnpm release
```

This will:
- Run tests and linting
- Build the package
- Generate changelog
- Create git tag
- Publish to npm

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check the README and examples

## Code of Conduct

Please be respectful and professional in all interactions. We aim to maintain a welcoming and inclusive community.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to NestJS Mutations Guard! 🚀