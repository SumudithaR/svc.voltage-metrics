import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewMetricDto } from 'src/dtos/new-metric.dto';
import { MetricEntity } from 'src/entities/metric.entity';
import { CreateResult } from 'src/models/create.result';
import { BaseRepository } from 'src/repositories/metrics.base-repository';

@Injectable()
export class MetricsService {
  constructor(
    private readonly metricsRepository: BaseRepository<MetricEntity>,
    private readonly logger: Logger,
  ) {}

  async createMetric(newItem: NewMetricDto): Promise<CreateResult<NewMetricDto>> {
    try {
      if (newItem === null) {
        return new CreateResult<NewMetricDto>(
          HttpStatus.BAD_REQUEST,
          'Provided new Metric is inavlid.',
        );
      }

      var dataItem = new MetricEntity();
      dataItem.voltage0 = newItem.voltage0;
      dataItem.voltage1 = newItem.voltage1;
      dataItem.voltage2 = newItem.voltage2;
      dataItem.voltage3 = newItem.voltage3;
      dataItem.voltage4 = newItem.voltage4;
      dataItem.voltage5 = newItem.voltage5;
      dataItem.voltage6 = newItem.voltage6;
      dataItem.voltage7 = newItem.voltage7;
      dataItem.deviceTime = newItem.deviceTime;

      var createdItem = await this.metricsRepository.createEntity(dataItem);

      if (createdItem === null) {
        return new CreateResult<NewMetricDto>(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to save new Metric.',
        );
      }
    } catch (ex) {
      this.logger.error(`Failed to create new Metric. Exception:${ex}`);
      return new CreateResult<NewMetricDto>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create new Metric.',
      );
    }
  }
 }
