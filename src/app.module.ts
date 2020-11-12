import { Logger, Module } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { BaseEntity, Connection, ConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { MetricsController } from './controllers/metrics/metrics.controller';
import { MetricEntity } from './entities/metric.entity';
import { MetricsModule } from './modules/metrics/metrics.module';
import { BaseRepository } from './repositories/metrics.base-repository';
import { KafkaService } from './services/kafka-service/kafka.service';
import { MetricsService } from './services/metrics/metrics.service';

let dbConnectionModule = TypeOrmModule.forRootAsync({
  name: 'DbConnection',
  useFactory: async () => {
    return {
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'Squak2992',
      database: 'voltage-metrics',
      synchronize: false,
      host: "walpola.tk",
      schema: "csone",
      entities: [BaseEntity, MetricEntity],
      extra: {
        ssl: true,
      }
    } as PostgresConnectionOptions;
  },
});

@Module({
  imports: [MetricsModule, dbConnectionModule, TypeOrmModule.forFeature([BaseRepository], 'DbConnection')],
  controllers: [MetricsController],
  providers: [Logger, ClientKafka, KafkaService, MetricsService, BaseRepository],
})
export class AppModule {}
