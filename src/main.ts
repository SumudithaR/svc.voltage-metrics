import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

const options = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['walpola.tk:9094'],
    },
    consumer: {
      groupId: 'kafka-voltage-metrics',
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, options);
  app.listen(() => {
    logger.log('Starting Voltage Metrics Service.');
  });
}
bootstrap();
