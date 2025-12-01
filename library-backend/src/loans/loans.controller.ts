import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiResponse } from '@nestjs/swagger';
import { Loan } from './entities/loan.entity';

@Controller('loans')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'BIBLIOTECARIO')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Empréstimo criado', type: Loan })
  create(@Body() dto: CreateLoanDto) {
    return this.loansService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de empréstimos', type: [Loan] })
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Empréstimo encontrado', type: Loan })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Empréstimo atualizado', type: Loan })
  update(@Param('id') id: string, @Body() dto: UpdateLoanDto) {
    return this.loansService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Empréstimo removido' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.loansService.remove(id);
  }

  @Post(':id/return')
  @ApiResponse({ status: 200, description: 'Devolução registrada', type: Loan })
  returnLoan(@Param('id') id: string) {
    return this.loansService.returnLoan(id);
  }

  @Post(':id/pay-fine')
  @ApiResponse({ status: 200, description: 'Multa paga', type: Loan })
  payFine(@Param('id') id: string) {
    return this.loansService.payFine(id);
  }
}
