import { Module } from '@nestjs/common';
import { MutationsGuardModule, AllowMutations } from 'nestjs-mutations-guard';
import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';

// Example controller showing how the guard works
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // GET requests are always allowed
    return { users: [] };
  }

  @Post()
  create(@Body() userData: any) {
    // This will be blocked when BLOCK_MUTATIONS=true
    return { message: 'User created', data: userData };
  }

  @Put(':id')
  update(@Body() userData: any) {
    // This will be blocked when BLOCK_MUTATIONS=true
    return { message: 'User updated', data: userData };
  }

  @Delete(':id')
  @AllowMutations() // This decorator overrides the global block
  remove() {
    // This DELETE will ALWAYS work, even when BLOCK_MUTATIONS=true
    return { message: 'User deleted (always allowed)' };
  }
}

@Controller('admin')
@AllowMutations() // All routes in this controller are always allowed
export class AdminController {
  @Post('backup')
  createBackup() {
    // Always allowed due to controller-level decorator
    return { message: 'Backup created' };
  }

  @Delete('cache')
  clearCache() {
    // Always allowed due to controller-level decorator
    return { message: 'Cache cleared' };
  }
}

// Main application module - just import MutationsGuardModule!
@Module({
  imports: [
    MutationsGuardModule.register(), // This single import protects ALL routes globally
  ],
  controllers: [UsersController, AdminController],
})
export class AppModule {}

/*
How to use:

1. Set environment variable:
   BLOCK_MUTATIONS=true    // Blocks all mutations globally
   BLOCK_MUTATIONS=false   // Allows all mutations (default)

2. Start your app:
   With BLOCK_MUTATIONS=true:
   ✅ GET /users              -> Works (always allowed)
   ❌ POST /users             -> 403 Forbidden
   ❌ PUT /users/1            -> 403 Forbidden
   ✅ DELETE /users/1         -> Works (@AllowMutations override)
   ✅ POST /admin/backup      -> Works (controller-level @AllowMutations)
   ✅ DELETE /admin/cache     -> Works (controller-level @AllowMutations)

   With BLOCK_MUTATIONS=false:
   ✅ All requests work normally

Perfect for:
- Maintenance mode: Set BLOCK_MUTATIONS=true to make API read-only
- Testing: Safe environment where mutations are controlled
- Staging protection: Prevent accidental data changes
- Emergency mode: Quick read-only switch during incidents
*/