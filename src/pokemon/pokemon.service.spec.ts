import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { TypeormService } from '../config';
import { PokemonOfDatabase } from './model/pokemonOfDatabase.entity';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: MongoRepository<PokemonOfDatabase>;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [TypeOrmModule.forRootAsync({ useClass: TypeormService })],
      providers: [PokemonService, { provide: getRepositoryToken(PokemonOfDatabase), useClass: MongoRepository }],
    }).compile();

    repository = getMongoRepository(PokemonOfDatabase);
    service = new PokemonService(repository);
  });

  it('should return pokemons', async () => {
    const pokemons = await service.getPokemons();
    expect(pokemons).not.toHaveLength(0);
  });
});
