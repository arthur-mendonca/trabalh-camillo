import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) { }

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn ?? randomUUID(),
        totalCopies: dto.totalCopies ?? 1,
      },
    });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException();
    return book;
  }

  update(id: string, dto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
