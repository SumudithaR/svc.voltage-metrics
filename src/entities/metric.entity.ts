import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class MetricEntity extends BaseEntity {
  @Column({ type: 'float', default: 0, nullable: false })
  voltage0: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage1: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage2: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage3: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage4: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage5: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage6: number;
  @Column({ type: 'float', default: 0, nullable: false })
  voltage7: number;
  @Column({ type: 'timestamp', nullable: false })
  deviceTime: Date;
}
