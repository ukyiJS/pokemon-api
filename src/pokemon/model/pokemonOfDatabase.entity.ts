import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ObjectIdColumn } from 'typeorm';
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
  @Field()
  _id?: string;
  no: string;
  name: string;
  engName: string;
  image: string;
  icon: string;
  stats: Stat[];
  types: string[];
  typeDefenses: TypeDefense[];
  species: string;
  height: string;
  weight: string;
  abilities: string[];
  hiddenAbility: string;
  evYield: string;
  catchRate: number;
  friendship: number;
  exp: number;
  eegGroups: string[];
  gender: Gender[];
  eggCycles: EggCycle;
  form: string;
  evolvingTo: EvolvingTo[];
  differentForm: DifferentForm[];
  createdAt: number;
  searchCount: number;
}
