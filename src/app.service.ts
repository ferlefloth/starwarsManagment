import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `    STARWARS-MANAGMENT-API `
  }
}
