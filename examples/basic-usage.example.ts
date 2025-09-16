import { Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { MutationsGuard, AllowMutations } from 'nestjs-mutations-guard';

@Controller('users')
@UseGuards(MutationsGuard)
export class UsersController {

  @Get()
  findAll() {
    return { message: 'This GET request is always allowed' };
  }

  @Post()
  create() {
    // This will be blocked when BLOCK_MUTATIONS=true
    return { message: 'User created' };
  }

  @Put(':id')
  update() {
    // This will be blocked when BLOCK_MUTATIONS=true
    return { message: 'User updated' };
  }

  @Delete(':id')
  @AllowMutations()
  remove() {
    // This DELETE will ALWAYS be allowed due to @AllowMutations()
    return { message: 'User deleted (always allowed)' };
  }
}