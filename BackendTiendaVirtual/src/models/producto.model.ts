import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pedido} from './pedido.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Pedido)
  pedidoId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
