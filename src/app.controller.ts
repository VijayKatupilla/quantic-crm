// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
// // src/app.controller.ts




// @Controller()
// export class AppController {
//    @Get()
//   getRoot(): string {
//     return 'Quantic CRM API is running';
//   }
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'Quantic CRM API is running';
  }
}
