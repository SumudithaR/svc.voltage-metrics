import { v4 as uuid } from 'uuid';
import {Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn({type: "uuid"})
    id : string = uuid();
}
