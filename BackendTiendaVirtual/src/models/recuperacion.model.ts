import {Model, model, property} from '@loopback/repository';

@model()
export class Recuperacion extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;


  constructor(data?: Partial<Recuperacion>) {
    super(data);
  }
}

export interface RecuperacionRelations {
  // describe navigational properties here
}

export type RecuperacionWithRelations = Recuperacion & RecuperacionRelations;
