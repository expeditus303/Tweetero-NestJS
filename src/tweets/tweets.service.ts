import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { createTweetDto } from 'src/dtos/tweet.dto';
import { Tweet } from 'src/entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(private readonly appService: AppService) {}

  private tweets: Tweet[] = [];

  private readonly TWEETS_PER_PAGE = 15;

  getPaginatedTweets(page: number = 1): Tweet[] {
    const startIndex = (page - 1) * this.TWEETS_PER_PAGE;
    const endIndex = startIndex + this.TWEETS_PER_PAGE;
    return this.tweets.slice(startIndex, endIndex);
  }

  createTweet(body: createTweetDto) {
    const existingUser = this.appService.findUserByUsername(body.username);

    if (!existingUser) {
      throw new UnauthorizedException('User not authorized');
    }

    const newTweet = new Tweet(existingUser, body.tweet);
    this.tweets.unshift(newTweet);
    return newTweet;
  }
}
