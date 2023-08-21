import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createTweetDto } from 'src/dtos/tweet.dto';
import { TweetsService } from './tweets.service';

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
