import { Field, Int, InterfaceType } from '@nestjs/graphql';
import { ColorType } from '../types/color.type';
import { EggCycleType } from '../types/eggCycle.type';
import { GenderType } from '../types/gender.type';
import { LanguageType } from '../types/language.type';
import { StatType } from '../types/stat.type';
import { TypeDefenseType } from '../types/typeDefense.type';

@InterfaceType()
export abstract class IPokemon {
  @Field()
  public no: string;
  @Field(() => LanguageType)
  public name: LanguageType;
  @Field()
  public image: string;
  @Field(() => ColorType)
  public color: ColorType;
  @Field({ nullable: true })
  public icon: string;
  @Field(() => [StatType])
  public stats: StatType[];
  @Field(() => [String])
  public types: string[];
  @Field(() => [TypeDefenseType])
  public typeDefenses: TypeDefenseType[];
  @Field()
  public species: string;
  @Field()
  public height: string;
  @Field()
  public weight: string;
  @Field(() => [String], { nullable: 'items' })
  public abilities: (string | null)[];
  @Field(() => String, { nullable: true })
  public hiddenAbility: string | null;
  @Field(() => [String])
  public evYield: string[];
  @Field(() => Int)
  public catchRate: number;
  @Field(() => Int)
  public friendship: number;
  @Field(() => Int)
  public exp: number;
  @Field(() => [String])
  public eegGroups: string[];
  @Field(() => [GenderType])
  public gender: GenderType[];
  @Field(() => EggCycleType)
  public eggCycle: EggCycleType;
  @Field(() => String, { nullable: true })
  public form: string | null;
}
