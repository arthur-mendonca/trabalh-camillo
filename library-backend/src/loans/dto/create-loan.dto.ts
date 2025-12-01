import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  @ApiProperty({ example: 'cmin5xmrs0002qrng2lcraidn' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'cmin6kg3y0001qr9gsn2ae1ny' })
  @IsString()
  bookId: string;

  @ApiProperty({ example: '2025-12-08T15:05:49.385Z', required: false })
  @IsDateString()
  @IsOptional()
  dueDate: string;

  @ApiProperty({ example: '2025-12-08T15:05:49.385Z', required: false })
  @IsDateString()
  @IsOptional()
  returnDate: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isFinePaid: boolean
}
