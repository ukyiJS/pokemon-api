import { Field, Float, Int, InterfaceType } from '@nestjs/graphql';
import { Column } from 'typeorm';
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
  @Column({ unique: true })
  @Field()
  no: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  engName: string;

  @Column()
  @Field()
  image: string;

  @Column()
  @Field({ nullable: true })
  icon?: string;

  @Column()
  @Field(() => [Stat])
  stats: Stat[];

  @Column()
  @Field(() => [String])
  types: string[];

  @Column()
  @Field(() => [TypeDefense])
  typeDefenses: TypeDefense[];

  @Column()
  @Field()
  species: string;

  @Column()
  @Field()
  height: string;

  @Column()
  @Field()
  weight: string;

  @Column()
  @Field(() => [String])
  abilities: string[];

  @Column()
  @Field({ nullable: true })
  hiddenAbility: string;

  @Column()
  @Field({ nullable: true })
  evYield: string;

  @Column()
  @Field(() => Int)
  catchRate: number;

  @Column()
  @Field(() => Int)
  friendship: number;

  @Column()
  @Field(() => Int)
  exp: number;

  @Column()
  @Field(() => [String])
  eegGroups: string[];

  @Column()
  @Field(() => [Gender])
  gender: Gender[];

  @Column()
  @Field(() => EggCycle)
  eggCycles: EggCycle;

  @Column()
  @Field({ nullable: true })
  form: string;

  @Column()
  @Field(() => [EvolvingTo])
  evolvingTo: EvolvingTo[];

  @Column()
  @Field(() => [DifferentForm])
  differentForm: DifferentForm[];

  @Column()
  @Field(() => Float)
  createdAt?: number;

  @Column()
  @Field(() => Int)
  searchCount?: number;
}
