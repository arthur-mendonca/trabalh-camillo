import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Response } from 'express';

@Catch(Prisma.PrismaClientValidationError, Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientValidationError | Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let message = 'Requisição inválida';
        let details: string | { code: string; meta?: Record<string, unknown> } | undefined = undefined;

        let status = 400;
        if (exception instanceof Prisma.PrismaClientValidationError) {
            message = 'Dados inválidos para operação com o banco';
            details = String((exception as Error).message);
        } else {
            const known = exception;
            if (known.code === 'P2025') {
                message = 'Recurso não encontrado';
                status = 404;
                details = { code: known.code, meta: known.meta };
            } else {
                message = 'Erro ao executar operação no banco';
                details = { code: known.code, meta: known.meta };
            }
        }

        response.status(status).json({ statusCode: status, message, details });
    }
}
