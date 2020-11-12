import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IResource } from 'src/interfaces/iresource.interface';
import { ClientKafka } from '@nestjs/microservices';
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

      this.logger.log(`Successfully published Metric. Topic => ${topicName}.`);
      return new PublishResult<IResource>(item);
    } catch (ex) {
      this.logger.error(`Failed to write to Kafka Topic. Exception: ${ex}`);
      return new PublishResult<IResource>(
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to write to Kafka Topic.',
      );
    }
  }
}
