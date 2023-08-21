import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { createTweetDto } from 'src/dtos/tweet.dto';
import { Tweet } from 'src/entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(private readonly appService: AppService) {}

  private tweets: Tweet[] = [];

  getAllTweets(): Tweet[] {
    return this.tweets;
  }

  createTweet(body: createTweetDto) {
    const existingUser = this.appService.findUserByUsername(body.username);

    if (!existingUser) {
        throw new UnauthorizedException('User not authorized');
    }

    const newTweet = new Tweet(existingUser, body.tweet);
    this.tweets.push(newTweet);
    return newTweet;
  }
}
