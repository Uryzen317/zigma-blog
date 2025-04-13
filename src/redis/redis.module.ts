import { Module } from '@nestjs/common';
import { Redis } from './redis';

@Module({
  providers: [Redis],
  exports: [Redis],
})
export class RedisModule {}
