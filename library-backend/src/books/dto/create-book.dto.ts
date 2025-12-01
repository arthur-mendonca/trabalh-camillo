import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Code' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Robert C. Martin' })
  @IsString()
  author: string;

  @ApiProperty({ example: 'BOOK-8f1b1d2a-9d43-4fd8-8b35-5b9d3c7e7c1a', required: false })
  @IsOptional()
  isbn?: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  totalCopies: number;
}
