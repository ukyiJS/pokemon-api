import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ObjectLiteral } from 'typeorm';
import { getPokemonsQuery } from './query';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
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
        .post('/graphql')
        .send({
          variables,
          query,
        })
        .expect(200)
        .then(({ body: { data } }) => data);

    it('should return pokemons', async () => {
      const { getPokemons } = await Query(getPokemonsQuery);
      expect(getPokemons).not.toHaveLength(0);
    });
  });
});
