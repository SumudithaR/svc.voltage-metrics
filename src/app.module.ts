import { Module } from '@nestjs/common';
import { MetricsController } from './controllers/metrics/metrics.controller';
import { MetricsModule } from './modules/metrics/metrics.module';
import { BaseRepository } from './repositories/metrics.base-repository';
import { MetricsService } from './services/metrics/metrics.service';

@Module({
  imports: [MetricsModule],
  controllers: [MetricsController],
  providers: [MetricsService, BaseRepository],
})
export class AppModule {}
