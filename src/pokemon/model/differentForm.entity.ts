import { ObjectType } from '@nestjs/graphql';
import { IPokemonDatabase } from '../pokemon.interface';
import { EggCycle } from './eggCycle.entity';
import { EvolvingTo } from './evolvingTo.entity';
import { Gender } from './gender.entity';
import { Stat } from './stat.entity';
import { TypeDefense } from './typeDefense.entity';

@ObjectType({ implements: () => [IPokemonDatabase] })
export class DifferentForm implements IPokemonDatabase {
  public no: string;
  public name: string;
  public engName: string;
  public image: string;
  public stats: Stat[];
  public types: string[];
  public typeDefenses: TypeDefense[];
  public species: string;
  public height: string;
  public weight: string;
  public abilities: string[];
  public hiddenAbility: string;
  public evYield: string;
  public catchRate: number;
  public friendship: number;
  public exp: number;
  public eegGroups: string[];
  public gender: Gender[];
  public eggCycles: EggCycle;
  public form: string;
  public differentForm: DifferentForm[];
  public evolvingTo: EvolvingTo[];
}
