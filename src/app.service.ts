import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { createUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  createUser(body: createUserDto) {
    const newUser = new User(body.username, body.avatar);
    return this.users.push(newUser);
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
  
}
