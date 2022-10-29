import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Articulo, ArticuloRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class ArticuloRepository extends DefaultCrudRepository<
  Articulo,
  typeof Articulo.prototype.id,
  ArticuloRelations
> {

  public readonly pedido: HasOneRepositoryFactory<Pedido, typeof Articulo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Articulo, dataSource);
    this.pedido = this.createHasOneRepositoryFactoryFor('pedido', pedidoRepositoryGetter);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
