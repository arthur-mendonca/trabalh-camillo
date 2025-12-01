import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiResponse } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'BIBLIOTECARIO')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Livro criado', type: Book })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de livros', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Livro encontrado', type: Book })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Livro atualizado', type: Book })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Livro removido' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
