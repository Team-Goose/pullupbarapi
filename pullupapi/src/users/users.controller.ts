import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get('all')
  async findAll() {
    return await(this.usersService.findAll());
  }

  @Get('range/id=:id/range=:range')
  async findRange(@Param('id') id: number, @Param('range') range: number){
    return await(this.usersService.findRange(id, range));
  }

  @Get('top/range=:range')
  async findTop(@Param('range') range: number){
    return await(this.usersService.findTop(range));
  }

  @Get('get/id=:id')
  async findOne(@Param('id') id: number) {
    return await(this.usersService.findOne(id));
  }

  @Post('update/id=:id')
  async update(@Param('id') id: number, @Body() user: User) {
    return await(this.usersService.update(id, user));
  }

  @Delete('delete/id=:id')
  async remove(@Param('id') id: number) {
    return await(this.usersService.remove(id));
  }
}
