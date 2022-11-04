import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Articulo,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoArticuloController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/articulo', {
    responses: {
      '200': {
        description: 'Articulo belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Articulo)},
          },
        },
      },
    },
  })
  async getArticulo(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Articulo> {
    return this.pedidoRepository.articulo(id);
  }
}
