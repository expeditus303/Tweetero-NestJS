import { IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty({message: 'All fields are required!'})
  avatar: string;
}
