import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class SQLErrorsInterceptor implements NestInterceptor {
  private logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      catchError((err) => {
        if (
          err instanceof QueryFailedError &&
          err.driverError.code === 'ER_DUP_ENTRY'
        ) {
          this.logger.debug(`Duplicate email error found`, err);
          throw new BadRequestException(
            'A user with that email already exists',
          );
        } else {
          throw err;
        }
        return of(null);
      }),
    );
  }
}
