import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NewMetricDto } from 'src/dtos/new-metric.dto';
import { MetricEntity } from 'src/entities/metric.entity';
import { IResource } from 'src/interfaces/iresource.interface';
import { CreateResult } from 'src/models/create.result';
import { BaseRepository } from 'src/repositories/metrics.base-repository';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { PublishResult } from 'src/models/publish.result';

@Injectable()
export class KafkaService {
  constructor(
    private readonly kafkaClient: ClientKafka,
    private readonly logger: Logger,
  ) {}

  async writeToTopic(
    item: IResource,
    topicName: string,
  ): Promise<PublishResult<IResource>> {
    try {
      
      this.kafkaClient.send(topicName, item);
      return new PublishResult<IResource>(item);
    
    } catch (ex) {
      
      this.logger.error(`Failed to write to Kafka Topic. Exception: ${ex}`);
      return new PublishResult<IResource>(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to write to Kafka Topic.');
    
    }
  }
}
