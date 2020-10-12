import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { BaseEntity } from 'src/entities/base.entity';
import { exception } from 'console';

@Injectable()
@EntityRepository()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  async createEntity(inputDataItem: T): Promise<T> {
    inputDataItem.id = uuid();
        return await this.save(inputDataItem as any);
  }

  async readEntity(id: string): Promise<T> {
    return await this.findOne(id);
  }

  async readAllEntities(): Promise<Array<T>> {
    return await this.find();
  }

  async updateEntity(id: string, inputDataItem: T): Promise<T> {
    if(!uuidValidate(id)){
      throw new exception("Provided id is invalid.");
    }
    
    inputDataItem.id = id;
    return await this.save(inputDataItem as any);
  }

  async deleteEntity(id: string): Promise<boolean> {
    if(!uuidValidate(id)){
      throw new exception("Provided id is invalid.");
    }
    
    let itemToDelete = await this.findOne(id);

    if (itemToDelete != null) {
      await this.remove(itemToDelete);
    }

    return true;
  }
}
