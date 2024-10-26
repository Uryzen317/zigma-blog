import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaSerivce: PrismaService) {}

  async getHello(): Promise<string> {
    let test = await this.prismaSerivce.user.findMany({});
    console.log(test);
    return 'Hello World!';
  }
}
