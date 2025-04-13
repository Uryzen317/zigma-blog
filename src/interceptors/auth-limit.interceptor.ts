import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { Redis } from 'src/redis/redis';

@Injectable()
export class AuthLimitInterceptor implements NestInterceptor {
  private readonly Max_Threshold = 10;

  constructor(private redis: Redis) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const ip: string =
      request.headers['x-forwarded-for']?.toString() || request.ip;
    const tries = await this.redis.client.get(ip);

    if (Number(tries) >= this.Max_Threshold) {
      console.log('Auth limiter : ', ip, ' : ', tries, ' tries');
      throw new RequestTimeoutException(
        'تلاش بیش از حد، آیپی شما برای ۱ ساعت محدود شد',
      );
    }

    return next.handle().pipe(
      tap({
        finalize: async () => {
          console.log('Request sended to client');
          await this.redis.client.incr(ip);
        },
      }),
    );
  }

  // cleanup auth limi
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupAuthLimit() {
    console.log('Auth limiter cleanup cycle started');
    await this.redis.client.flushall();
  }
}
