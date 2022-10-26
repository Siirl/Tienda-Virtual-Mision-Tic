import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Pedido,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPedidoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Pedido> {
    return this.productoRepository.pedido(id);
  }
}
