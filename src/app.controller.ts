import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { createUserDto } from './dtos/user.dto';

@Controller('sign-up')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() body: createUserDto) {
    return this.appService.createUser(body)
  }
}
