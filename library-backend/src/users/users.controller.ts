import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import type { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiResponse({
    status: 200,
    description: "Lista de usuários",
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Usuário autenticado",
    type: User,
  })
  async me(@Req() req: Request & { user?: { userId: string; role: string } }) {
    return await this.usersService.findOne(req.user!.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Usuário encontrado",
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "Usuário atualizado",
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: "Usuário removido",
  })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
