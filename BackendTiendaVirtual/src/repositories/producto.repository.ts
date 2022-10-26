import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly pedido: BelongsToAccessor<Pedido, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
  }
}
