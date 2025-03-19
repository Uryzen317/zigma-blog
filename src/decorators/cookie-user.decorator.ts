import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const cookieUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const cookieString = request.signedCookies['zigma-mainnet-auth'];

    return JSON.parse(cookieString);
  },
);
