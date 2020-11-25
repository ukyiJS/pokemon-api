import { ObjectType } from '@nestjs/graphql';
import { IPokemonOfDatabase } from '../pokemon.interface';
import { EggCycle } from './eggCycle.entity';
import { EvolvingTo } from './evolvingTo.entity';
import { Gender } from './gender.entity';
import { Stat } from './stat.entity';
import { TypeDefense } from './typeDefense.entity';

@ObjectType({ implements: () => [IPokemonOfDatabase] })
export class DifferentForm implements IPokemonOfDatabase {
  no: string;
  name: string;
  engName: string;
  image: string;
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
  differentForm: DifferentForm[];
  evolvingTo: EvolvingTo[];
}
