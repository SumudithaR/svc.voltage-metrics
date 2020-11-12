import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { NewMetricDto } from 'src/dtos/new-metric.dto';
import { MetricsService } from 'src/services/metrics/metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricService: MetricsService,
    private readonly logger: Logger,
  ) {}

  @MessagePattern('raw-voltage-metrics')
  async getVoltageMetrics(@Payload() rawMetric) {
    try {
      if (rawMetric == null) {
        this.logger.error(`Received invalid payload: ${rawMetric}`);
      }

      var mappedMetric = rawMetric.value as NewMetricDto;
      var createResult = await this.metricService.createMetric(mappedMetric);

      if (createResult.isSuccess()) {
        await this.metricService.publishMetric(createResult.createdItem);
      }
    } catch (ex) {
      this.logger.error(`Failed to capture new Metric. Exception: ${ex}`);
    }
  }
}
