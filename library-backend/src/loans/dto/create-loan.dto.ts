import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  userId: string;

  @IsString()
  bookId: string;

  @IsDateString()
  @IsOptional()
  dueDate: string;

  @IsDateString()
  @IsOptional()
  returnDate: string;

  @IsBoolean()
  @IsOptional()
  isFinePaid: boolean
}
