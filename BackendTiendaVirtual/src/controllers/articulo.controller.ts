import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Articulo} from '../models';
import {ArticuloRepository} from '../repositories';

export class ArticuloController {
  constructor(
    @repository(ArticuloRepository)
    public articuloRepository : ArticuloRepository,
  ) {}

  @post('/articulos')
  @response(200, {
    description: 'Articulo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Articulo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulo, {
            title: 'NewArticulo',
            exclude: ['id'],
          }),
        },
      },
    })
    articulo: Omit<Articulo, 'id'>,
  ): Promise<Articulo> {
    return this.articuloRepository.create(articulo);
  }

  @get('/articulos/count')
  @response(200, {
    description: 'Articulo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Articulo) where?: Where<Articulo>,
  ): Promise<Count> {
    return this.articuloRepository.count(where);
  }

  @get('/articulos')
  @response(200, {
    description: 'Array of Articulo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Articulo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Articulo) filter?: Filter<Articulo>,
  ): Promise<Articulo[]> {
    return this.articuloRepository.find(filter);
  }

  @patch('/articulos')
  @response(200, {
    description: 'Articulo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulo, {partial: true}),
        },
      },
    })
    articulo: Articulo,
    @param.where(Articulo) where?: Where<Articulo>,
  ): Promise<Count> {
    return this.articuloRepository.updateAll(articulo, where);
  }

  @get('/articulos/{id}')
  @response(200, {
    description: 'Articulo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Articulo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Articulo, {exclude: 'where'}) filter?: FilterExcludingWhere<Articulo>
  ): Promise<Articulo> {
    return this.articuloRepository.findById(id, filter);
  }

  @patch('/articulos/{id}')
  @response(204, {
    description: 'Articulo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Articulo, {partial: true}),
        },
      },
    })
    articulo: Articulo,
  ): Promise<void> {
    await this.articuloRepository.updateById(id, articulo);
  }

  @put('/articulos/{id}')
  @response(204, {
    description: 'Articulo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() articulo: Articulo,
  ): Promise<void> {
    await this.articuloRepository.replaceById(id, articulo);
  }

  @del('/articulos/{id}')
  @response(204, {
    description: 'Articulo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.articuloRepository.deleteById(id);
  }
}
