import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  private readonly configService: ConfigService;

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      url: this.configService.get('database.url'),
      entities: [join(__dirname, '../../', '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
      keepConnectionAlive: true,
    };
  }
}
