import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis as IORedis } from 'ioredis';

@Injectable()
export class Redis {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {}

  public prefix = this.configService.get('REDIS_PREFIX') + '-';
  public client: IORedis = new IORedis({
    host: this.configService.get('REDIS_HOST'), // Redis host
    port: this.configService.get('REDIS_PORT'),
    password: this.configService.get('REDIS_PASSWORD'),
  });
}
