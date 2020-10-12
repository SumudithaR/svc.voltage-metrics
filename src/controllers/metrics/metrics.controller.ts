import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('metrics')
export class MetricsController {
  constructor(private readonly logger: Logger) {}

  @MessagePattern('voltage-metrics-topic')
  getVoltageMetrics(@Payload() message) {
    try {
      if (message == null) {
        this.logger.error(`Received invalid payload: ${message}`);
      }
    } catch (e) {}
  }
}
