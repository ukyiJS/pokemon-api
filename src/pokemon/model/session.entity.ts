import { Cookie } from 'express-session';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PokemonName } from '../pokemon.type';

export interface Session {
  cookie: Cookie;
  pokemonNames: PokemonName[];
  [key: string]: any;
}

@Entity()
export class Sessions {
  @ObjectIdColumn({ type: 'uuid' })
  public _id: string;
  @Column()
  public expires: Date;
  @Column()
  public session: Session;
}
