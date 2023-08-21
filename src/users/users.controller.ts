import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from '../app.service';
import { createUserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Controller('sign-up')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  createUser(@Body() body: createUserDto) {
    return this.usersService.createUser(body);
  }
}
