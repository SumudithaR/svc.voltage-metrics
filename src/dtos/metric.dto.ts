import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IResource } from 'src/interfaces/iresource.interface';

export class MetricDto implements IResource {
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @IsNumber()
  @IsNotEmpty()
  voltage0: number;

  @IsNumber()
  @IsNotEmpty()
  voltage1: number;

  @IsNumber()
  @IsNotEmpty()
  voltage2: number;

  @IsNumber()
  @IsNotEmpty()
  voltage3: number;

  @IsNumber()
  @IsNotEmpty()
  voltage4: number;

  @IsNumber()
  @IsNotEmpty()
  voltage5: number;

  @IsNumber()
  @IsNotEmpty()
  voltage6: number;

  @IsNumber()
  @IsNotEmpty()
  voltage7: number;

  @IsDate()
  @IsNotEmpty()
  deviceTime: Date;
}
