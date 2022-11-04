import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Articulo,
  Pedido,
} from '../models';
import {ArticuloRepository} from '../repositories';

export class ArticuloPedidoController {
  constructor(
    @repository(ArticuloRepository) protected articuloRepository: ArticuloRepository,
  ) { }

  @get('/articulos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Articulo has one Pedido',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pedido),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido> {
    return this.articuloRepository.pedido(id).get(filter);
  }

  @post('/articulos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Articulo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Articulo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInArticulo',
            exclude: ['id'],
            optional: ['articuloId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.articuloRepository.pedido(id).create(pedido);
  }

  @patch('/articulos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Articulo.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.articuloRepository.pedido(id).patch(pedido, where);
  }

  @del('/articulos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Articulo.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.articuloRepository.pedido(id).delete(where);
  }
}
