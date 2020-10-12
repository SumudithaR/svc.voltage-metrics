import { HttpStatus } from '@nestjs/common';
import { IResource } from 'src/interfaces/iresource.interface';
import { BaseResult } from './base.result';

export class DeleteResult<T extends IResource> extends BaseResult {
  constructor();
  constructor(statusCode?: number, error?: string) {
    if (statusCode !== null) {
      statusCode = HttpStatus.NO_CONTENT;
    }

    super(statusCode, error);
  }
}
