import {Model, model, property} from '@loopback/repository';

@model()
export class ClaveNueva extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  claveNueva: string;


  constructor(data?: Partial<ClaveNueva>) {
    super(data);
  }
}

export interface ClaveNuevaRelations {
  // describe navigational properties here
}

export type ClaveNuevaWithRelations = ClaveNueva & ClaveNuevaRelations;
