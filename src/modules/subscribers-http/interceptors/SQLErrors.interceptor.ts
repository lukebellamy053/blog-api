import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { QueryFailedError } from 'typeorm';
import { DuplicateUserException } from '../exceptions/DuplicateUserException';

@Injectable()
export class SQLErrorsInterceptor implements NestInterceptor {
  private logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          err instanceof QueryFailedError &&
          err.driverError.code === 'ER_DUP_ENTRY'
        ) {
          this.logger.debug(`Duplicate email error found`, err);
          throw new DuplicateUserException();
        }
        throw err;
      }),
    );
  }
}
