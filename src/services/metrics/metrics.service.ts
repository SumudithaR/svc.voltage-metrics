import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MetricDto } from 'src/dtos/metric.dto';
import { NewMetricDto } from 'src/dtos/new-metric.dto';
import { MetricEntity } from 'src/entities/metric.entity';
import { CreateResult } from 'src/models/create.result';
import { PublishResult } from 'src/models/publish.result';
import { BaseRepository } from 'src/repositories/metrics.base-repository';
import { KafkaService } from '../kafka-service/kafka.service';

@Injectable()
export class MetricsService {
  constructor(
    private readonly metricsRepository: BaseRepository<MetricEntity>,
    private readonly kafkaService: KafkaService,
    private readonly logger: Logger,
  ) {}

  async createMetric(newItem: NewMetricDto): Promise<CreateResult<MetricDto>> {
    try {
      if (newItem === null) {
        return new CreateResult<MetricDto>(
          null,
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

      // TODO: Fix this.
      var createdItem = dataItem;
      //await this.metricsRepository.createEntity(dataItem);

      if (createdItem === null) {
        return new CreateResult<MetricDto>(
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to save new Metric.',
        );
      }

      this.logger.log('Successfully created Metric.');
      return new CreateResult<MetricDto>(createdItem);
    } catch (ex) {
      this.logger.error(`Failed to create new Metric. Exception:${ex}`);
      return new CreateResult<MetricDto>(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create new Metric.',
      );
    }
  }

  async publishMetric(item: MetricDto): Promise<PublishResult<MetricDto>> {
    try {
      if (item === null) {
        return new PublishResult<MetricDto>(
          null,
          HttpStatus.BAD_REQUEST,
          'Provided Metric is inavlid.',
        );
      }

      var writeResult = await this.kafkaService.writeToTopic(
        item,
        'live-voltage-metrics',
      );

      if (!writeResult.isSuccess()) {
        return new PublishResult<MetricDto>(
          null,
          writeResult.statusCode,
          'Failed to publish Metric.',
        );
      }

      return new PublishResult<MetricDto>(item);
    } catch (ex) {
      this.logger.error(`Failed to publish Metric. Exception:${ex}`);
      return new PublishResult<MetricDto>(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to publish Metric.',
      );
    }
  }
}
