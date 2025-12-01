import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) { }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new BadRequestException('Email ou senha inválidos');
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new BadRequestException('Email ou senha inválidos');
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.validateUser(email, password);
      const payload = { sub: user.id, role: user.role };
      const token = await this.jwt.signAsync(payload);
      return { access_token: token };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
