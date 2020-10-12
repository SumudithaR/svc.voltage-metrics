import { Logger, Module } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MetricsController } from './controllers/metrics/metrics.controller';
import { MetricsModule } from './modules/metrics/metrics.module';
import { BaseRepository } from './repositories/metrics.base-repository';
import { KafkaService } from './services/kafka-service/kafka.service';
import { MetricsService } from './services/metrics/metrics.service';

@Module({
  imports: [MetricsModule],
  controllers: [MetricsController],
  providers: [Logger, ClientKafka, KafkaService, MetricsService, BaseRepository],
})
export class AppModule {}
