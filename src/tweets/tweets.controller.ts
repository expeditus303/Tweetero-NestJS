import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { createTweetDto } from '../dtos/tweet.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Get()
  getPaginatedTweets(@Query('page') page?: number) {
    let currentPage = 1; // default value

    if (page) {
      const parsedPage = Number(page);
      if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        throw new BadRequestException('Informe uma página válida!');
      }
      currentPage = parsedPage;
    }

    return this.tweetsService.getPaginatedTweets(currentPage);
  }

  @Get(':username')
  getUserTweets(@Param('username') username: string){
    return this.tweetsService.getUserTweets(username)
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  createTweet(@Body() body: createTweetDto) {
    return this.tweetsService.createTweet(body);
  }
}
