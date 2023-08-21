import {  Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  appHealth(){
    return ("I'm okay!")
  }
}
