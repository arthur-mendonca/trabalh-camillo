import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateLoanDto) {
    const book = await this.prisma.book.findUnique(
      {
        where: { id: dto.bookId }
      });
    if (!book)
      throw new BadRequestException('Livro inválido');

    const activeCount = await this.prisma.loan.count({
      where: { bookId: dto.bookId, returnDate: null }
    });
    if (activeCount >= book.totalCopies)
      throw new BadRequestException('Não há exemplares disponíveis');

    const existingOpenForUserBook = await this.prisma.loan.count({
      where: { userId: dto.userId, bookId: dto.bookId, returnDate: null }
    });
    if (existingOpenForUserBook > 0)
      throw new BadRequestException('Usuário já possui empréstimo ativo para este livro');

    const overdueOpenCount = await this.countOverdueUnreturned(dto.userId);
    if (overdueOpenCount > 0)
      throw new BadRequestException('Usuário possui empréstimos em atraso');

    const unpaidFineCount = await this.countUnpaidFines(dto.userId);
    if (unpaidFineCount > 0)
      throw new BadRequestException('Usuário possui multas não pagas');

    return this.prisma.loan.create({
      data: {
        userId: dto.userId,
        bookId: dto.bookId,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  findAll() {
    return this.prisma.loan.findMany();
  }

  countOverdueUnreturned(userId: string) {
    return this.prisma.loan.count({
      where: {
        userId,
        returnDate: null,
        dueDate: { lt: new Date() },
      },
    });
  }

  countUnpaidFines(userId: string) {
    return this.prisma.loan.count({
      where: {
        userId,
        isFinePaid: false,
        fineAmount: { gt: 0 },
      },
    });
  }

  async findOne(id: string) {
    const loan = await this.prisma.loan.findUnique({ where: { id } });
    if (!loan) throw new NotFoundException();
    return loan;
  }

  update(id: string, dto: UpdateLoanDto) {
    return this.prisma.loan.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.loan.delete({ where: { id } });
  }

  async returnLoan(id: string, ratePerDay = Number(process.env.FINE_RATE ?? 2)) {
    const loan = await this.findOne(id);
    if (loan.returnDate) return loan;
    const now = new Date();
    let fine = 0;
    if (now.getTime() > new Date(loan.dueDate).getTime()) {
      const diffMs = now.getTime() - new Date(loan.dueDate).getTime();
      const daysLate = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      fine = daysLate * ratePerDay;
    }
    return this.prisma.loan.update({
      where: { id },
      data: { returnDate: now, fineAmount: fine, isFinePaid: false },
    });
  }

  async payFine(id: string) {
    const loan = await this.findOne(id);
    if (!loan.returnDate) throw new BadRequestException('Empréstimo ainda não devolvido');
    if (loan.fineAmount <= 0) throw new BadRequestException('Sem multa para pagar');
    return this.prisma.loan.update({ where: { id }, data: { isFinePaid: true, fineAmount: 0 } });
  }

  async getLoansByStudent(userId: string) {
    return this.prisma.loan.findMany({
      where: { userId },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { loanDate: 'desc' },
    });
  }

  // Relatório 6.2: Livros em atraso
  async getOverdueLoans() {
    const now = new Date();
    return this.prisma.loan.findMany({
      where: {
        returnDate: null,
        dueDate: { lt: now },
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { dueDate: 'asc' },
    });
  }
}
