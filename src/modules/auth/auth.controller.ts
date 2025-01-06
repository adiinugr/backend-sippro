import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { ResetPasswordDto } from 'src/modules/auth/dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('reset-password/student')
  resetStudentPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetStudentPassword(resetPasswordDto);
  }

  @Patch('reset-password/teacher')
  resetTeaccherPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetTeacherPassword(resetPasswordDto);
  }
}
