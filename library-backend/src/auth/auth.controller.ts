import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin@mail.com' },
        password: { type: 'string', example: '123' },
      },
      required: ['email', 'password'],
    },
  })
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }
}
