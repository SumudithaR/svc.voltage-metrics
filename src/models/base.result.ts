import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export abstract class BaseResult {
  @IsNumber()
  @IsNotEmpty()
  statusCode: number;

  @ValidateIf(x => x.statusCode !== null)
  @IsNotEmpty()
  error: string;

  isSuccess(): boolean {
    if (this.statusCode.toString().startsWith('2')) {
      return true;
    }
    return false;
  }

  constructor(statusCode: number);
  constructor(statusCode: number, error: string);
  constructor(statusCode?: number, error?: string) {
    this.statusCode = statusCode;
    this.error = error;
  }
}
