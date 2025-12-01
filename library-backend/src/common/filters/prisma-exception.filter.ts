import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientValidationError, Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let message = 'Requisição inválida';
        let details: any = undefined;

        if (exception instanceof Prisma.PrismaClientValidationError) {
            message = 'Dados inválidos para operação com o banco';
            details = exception.message;
        } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            message = 'Erro ao executar operação no banco';
            details = { code: exception.code, meta: exception.meta };
        }

        const status = 400;
        (response as any).status(status).json({ statusCode: status, message, details });
    }
}