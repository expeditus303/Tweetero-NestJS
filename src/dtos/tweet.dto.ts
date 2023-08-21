import { IsNotEmpty, IsString } from 'class-validator';

export class createTweetDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  tweet: string;
}
