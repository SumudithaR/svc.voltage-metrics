import { HttpStatus } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { IResource } from 'src/interfaces/iresource.interface';
import { BaseResult } from './base.result';

export class PublishResult<T extends IResource> extends BaseResult {
  @IsOptional()
  publishedItem: T;

  constructor(item: T);
  constructor(statusCode: number, error: string);
  constructor(statusCode?: number, error?: string, item?: T,) {
    if (item !== null) {
      statusCode = HttpStatus.OK;
    }

    super(statusCode, error);
    this.publishedItem = item;
  }
}
