import { HttpStatus } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { IResource } from 'src/interfaces/iresource.interface';
import { BaseResult } from './base.result';

export class ReadAllResult<T extends IResource> extends BaseResult {
  @IsOptional()
  readItems: Array<T>;

  constructor(items: Array<T>);
  constructor(items?: Array<T>, statusCode?: number, error?: string) {
    if (items !== null) {
      statusCode = HttpStatus.OK;
    }

    super(statusCode, error);
    this.readItems = items;
  }
}
