import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createTweetDto } from '../dtos/tweet.dto';
import { Tweet } from '../entities/tweet.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TweetsService {
  constructor(private readonly usersService: UsersService) {}

  private tweets: Tweet[] = [];

  private readonly TWEETS_PER_PAGE = 15;

  getPaginatedTweets(page: number = 1) {
    const startIndex = (page - 1) * this.TWEETS_PER_PAGE;
    const endIndex = startIndex + this.TWEETS_PER_PAGE;
    const paginatedTweets = this.tweets.slice(startIndex, endIndex);

    return paginatedTweets.map(tweet => ({
      username: tweet.user.username,
      avatar: tweet.user.avatar,
      tweet: tweet.tweet
    }));
  }

  getUserTweets(username: string){
    const userTweets = this.tweets.filter((element) => element.user.username.toLowerCase() === username.toLowerCase() )

    return userTweets.map(tweet => ({
      username: tweet.user.username,
      avatar: tweet.user.avatar,
      tweet: tweet.tweet
    }));
  }

  createTweet(body: createTweetDto) {
    const existingUser = this.usersService.findUserByUsername(body.username);

    if (!existingUser) {
      throw new UnauthorizedException('User not authorized');
    }

    const newTweet = new Tweet(existingUser, body.tweet);
    this.tweets.unshift(newTweet);
    return newTweet;
  }
}
