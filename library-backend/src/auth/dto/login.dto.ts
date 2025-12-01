import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'admin@mail.com' })
    @IsEmail({}, { message: "Email deve ter um formato válido" })
    email: string;

    @ApiProperty({ example: '123' })
    @IsString({ message: "Senha é obrigatória" })
    password: string;
}
