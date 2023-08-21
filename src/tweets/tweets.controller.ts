import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTweetDto } from 'src/dtos/tweet.dto';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
    constructor(private readonly tweetService: TweetsService) {}

    @Get()
    getLast15Tweets() {
        return this.tweetService.getLast15Tweets()
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
    createTweet(@Body() body: createTweetDto){
        return this.tweetService.createTweet(body)
    }
}
