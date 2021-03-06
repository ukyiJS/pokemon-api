import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ObjectLiteral } from 'typeorm';
import { AppModule } from '../src/app.module';
import { PokemonModule } from '../src/pokemon/pokemon.module';
import { getAutoCompleteKeywordQuery, getPokemonQuery, getPokemonsQuery } from './query';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, PokemonModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('GraphQL (e2e)', () => {
    const Query = (query: string, variables?: ObjectLiteral) =>
      request(app.getHttpServer())
        .post('/api/graphql')
        .send({ variables, query })
        .expect(200)
        .then(({ body: { data } }) => data);

    it('should return pokemon', async () => {
      const { getPokemon } = await Query(getPokemonQuery);
      expect(getPokemon).not.toBeNull();
    });

    it('should return pokemons', async () => {
      const { getPokemons } = await Query(getPokemonsQuery);
      expect(getPokemons).not.toHaveLength(0);
    });

    it('should return autoCompleteKeywords', async () => {
      const { getAutoCompleteKeyword } = await Query(getAutoCompleteKeywordQuery);
      expect(getAutoCompleteKeyword).not.toHaveLength(0);
    });
  });
});
