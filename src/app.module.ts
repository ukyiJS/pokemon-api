import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { HttpExceptionFilter, LoggingInterceptor, TimeoutInterceptor } from './common';
import { configOptions, GraphqlService, TypeormService } from './config';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
  imports: [
    ConfigModule.forRoot(configOptions),
    GraphQLModule.forRootAsync({ useClass: GraphqlService }),
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    PokemonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
