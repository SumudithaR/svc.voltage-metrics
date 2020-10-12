import { HttpStatus } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { IResource } from 'src/interfaces/iresource.interface';
import { BaseResult } from './base.result';

export class UpdateResult<T extends IResource> extends BaseResult {
  @IsOptional()
  updatedItem: T;

  constructor(item: T);
  constructor(item?: T, statusCode?: number, error?: string) {
    if (item !== null) {
      statusCode = HttpStatus.OK;
    }

    super(statusCode, error);
    this.updatedItem = item;
  }
}
