import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { v4 } from 'uuid';
import { IPokemonOfDatabase } from '../pokemon.interface';
import { DifferentForm } from './differentForm.entity';
import { EggCycle } from './eggCycle.entity';
import { EvolvingTo } from './evolvingTo.entity';
import { Gender } from './gender.entity';
import { Stat } from './stat.entity';
import { TypeDefense } from './typeDefense.entity';

@Entity()
@ObjectType({ implements: () => [IPokemonOfDatabase] })
export class PokemonOfDatabase implements IPokemonOfDatabase {
  @ObjectIdColumn()
  _id?: string;

  @Column({ unique: true })
  no: string;

  @Column()
  name: string;
  @Column()
  engName: string;

  @Column()
  image: string;

  @Column()
  icon: string;

  @Column()
  stats: Stat[];

  @Column()
  types: string[];

  @Column()
  typeDefenses: TypeDefense[];

  @Column()
  species: string;

  @Column()
  height: string;

  @Column()
  weight: string;

  @Column()
  abilities: string[];

  @Column()
  hiddenAbility: string;

  @Column()
  evYield: string;

  @Column()
  catchRate: number;

  @Column()
  friendship: number;

  @Column()
  exp: number;

  @Column()
  eegGroups: string[];

  @Column()
  gender: Gender[];

  @Column()
  eggCycles: EggCycle;

  @Column()
  form: string;

  @Column()
  evolvingTo: EvolvingTo[];

  @Column()
  differentForm: DifferentForm[];

  @Column()
  createdAt: number;

  @Column()
  searchCount: number;
}
