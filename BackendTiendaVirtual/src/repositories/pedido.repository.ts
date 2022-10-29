import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Articulo, Persona} from '../models';
import {ArticuloRepository} from './articulo.repository';
import {PersonaRepository} from './persona.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly articulo: BelongsToAccessor<Articulo, typeof Pedido.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ArticuloRepository') protected articuloRepositoryGetter: Getter<ArticuloRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Pedido, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.articulo = this.createBelongsToAccessorFor('articulo', articuloRepositoryGetter,);
    this.registerInclusionResolver('articulo', this.articulo.inclusionResolver);
  }
}
