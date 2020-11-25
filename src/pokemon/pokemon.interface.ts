import { Field, Float, Int, InterfaceType } from '@nestjs/graphql';
import { DifferentForm } from './model/differentForm.entity';
import { EggCycle } from './model/eggCycle.entity';
import { EvolvingTo } from './model/evolvingTo.entity';
import { Gender } from './model/gender.entity';
import { Stat } from './model/stat.entity';
import { TypeDefense } from './model/typeDefense.entity';

export interface IStat {
  name: string;
  value: number;
}

export interface IColor {
  name: string;
  code: string;
}

export interface IGender {
  name: string;
  ratio: number;
}

export interface ITypeDefense {
  type: string;
  damage: number;
}

export interface IEggCycle {
  cycle: number;
  step: number[] | null;
}

export interface IEvolvingTo {
  no: string;
  name: string;
  image: string;
  form: string | null;
  condition?: string;
  evolvingTo: IEvolvingTo[];
}

@InterfaceType()
export abstract class IPokemonOfDatabase {
  @Field()
  _id?: string;

  @Field()
  no: string;

  @Field()
  name: string;

  @Field()
  engName: string;

  @Field()
  image: string;

  @Field({ nullable: true })
  icon?: string;

  @Field(() => [Stat])
  stats: Stat[];

  @Field(() => [String])
  types: string[];

  @Field(() => [TypeDefense])
  typeDefenses: TypeDefense[];

  @Field()
  species: string;

  @Field()
  height: string;

  @Field()
  weight: string;

  @Field(() => [String])
  abilities: string[];

  @Field({ nullable: true })
  hiddenAbility: string;

  @Field({ nullable: true })
  evYield: string;

  @Field(() => Int)
  catchRate: number;

  @Field(() => Int)
  friendship: number;

  @Field(() => Int)
  exp: number;

  @Field(() => [String])
  eegGroups: string[];

  @Field(() => [Gender])
  gender: Gender[];

  @Field(() => EggCycle)
  eggCycles: EggCycle;

  @Field({ nullable: true })
  form: string;

  @Field(() => [EvolvingTo])
  evolvingTo: EvolvingTo[];

  @Field(() => [DifferentForm])
  differentForm: DifferentForm[];

  @Field(() => Float)
  createdAt?: number;

  @Field(() => Int)
  searchCount?: number;
}
