import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { BaseEntity } from 'src/entities/base.entity';
import { exception } from 'console';
import { MetricEntity } from 'src/entities/metric.entity';

@Injectable()
@EntityRepository(MetricEntity)
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  constructor(private readonly logger: Logger) {
    super();
  }

  async createEntity(inputDataItem: T): Promise<T> {
    inputDataItem.id = uuid();
    var test = await this.save((inputDataItem as any) as DeepPartial<T>);
    return inputDataItem;
  }

  async readEntity(id: string): Promise<T> {
    return await this.findOne(id);
  }

  async readAllEntities(): Promise<Array<T>> {
    return await this.find();
  }

  async updateEntity(id: string, inputDataItem: T): Promise<T> {
    if (!uuidValidate(id)) {
      throw new exception('Provided id is invalid.');
    }

    inputDataItem.id = id;
    return await this.save(inputDataItem as any);
  }

  async deleteEntity(id: string): Promise<boolean> {
    if (!uuidValidate(id)) {
      throw new exception('Provided id is invalid.');
    }

    let itemToDelete = await this.findOne(id);

    if (itemToDelete != null) {
      await this.remove(itemToDelete);
    }

    return true;
  }
}
