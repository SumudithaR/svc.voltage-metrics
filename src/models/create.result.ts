import { HttpStatus } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { IResource } from 'src/interfaces/iresource.interface';
import { BaseResult } from './base.result';

export class CreateResult<T extends IResource> extends BaseResult {
  @IsOptional()
  createdItem: T;

  constructor(item: T);
  constructor(item: T, statusCode: number, error: string);
  constructor(item: T = null, statusCode?: number, error?: string) {
    if (item !== null) {
      statusCode = HttpStatus.CREATED;
    }

    super(statusCode, error);
    this.createdItem = item;
  }
}
