import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedAdmin();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    private async seedAdmin() {
        const email: string = process.env.ADMIN_EMAIL ?? 'admin@mail.com';
        const name: string = process.env.ADMIN_NAME ?? 'Admin';
        const password: string = process.env.ADMIN_PASSWORD ?? '123';

        const hashed: string = await bcrypt.hash(password, 10);
        await this.user.upsert({
            where: { email },
            create: {
                email,
                name,
                password: hashed,
                role: Role.ADMIN,
            },
            update: {
                name,
                password: hashed,
                role: Role.ADMIN,
            },
        });
    }
}
