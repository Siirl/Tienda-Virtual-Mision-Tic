import {Model, model, property} from '@loopback/repository';

@model()
export class CambioDeClave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  claveActual: string;

  @property({
    type: 'string',
    required: true,
  })
  claveNueva: string;


  constructor(data?: Partial<CambioDeClave>) {
    super(data);
  }
}

export interface CambioDeClaveRelations {
  // describe navigational properties here
}

export type CambioDeClaveWithRelations = CambioDeClave & CambioDeClaveRelations;
