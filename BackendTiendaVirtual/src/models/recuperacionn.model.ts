import {Model, model, property} from '@loopback/repository';

@model()
export class Recuperacionn extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;


  constructor(data?: Partial<Recuperacionn>) {
    super(data);
  }
}

export interface RecuperacionnRelations {
  // describe navigational properties here
}

export type RecuperacionnWithRelations = Recuperacionn & RecuperacionnRelations;
