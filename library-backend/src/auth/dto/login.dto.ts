import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "Email deve ter um formato válido" })
    email: string;

    @IsString({ message: "Senha é obrigatória" })
    password: string;
}
