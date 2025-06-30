import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    // console.log('Does user exist. Request body:', request.body);
    const token = await request.headers.authorization;
    console.log(
      'Auth.Token.Guard. Provided token:',
      token,
      'Env token:',
      process.env.AUTH_TOKEN,
    );
    if (process.env.AUTH_TOKEN === '' || token !== process.env.AUTH_TOKEN) {
      throw new ForbiddenException('Provided token is not valid.');
    }
    return true;
  }
}
