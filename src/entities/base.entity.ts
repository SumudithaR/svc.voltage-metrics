import { v4 as uuid } from 'uuid';
import {PrimaryGeneratedColumn} from 'typeorm'

export abstract class BaseEntity {
    @PrimaryGeneratedColumn({type: "uuid"})
    id : string = uuid();
}
