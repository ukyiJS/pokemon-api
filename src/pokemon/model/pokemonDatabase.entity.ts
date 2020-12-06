import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IPokemonDatabase } from '../pokemon.interface';
import { DifferentForm } from './differentForm.entity';
import { EggCycle } from './eggCycle.entity';
import { EvolvingTo } from './evolvingTo.entity';
import { Gender } from './gender.entity';
import { LanguageType } from './languageType.entity';
import { Stat } from './stat.entity';
import { TypeDefense } from './typeDefense.entity';

@Entity()
@ObjectType({ implements: () => [IPokemonDatabase] })
export class PokemonDatabase implements IPokemonDatabase {
  @ObjectIdColumn()
  public _id?: string;
  @Column({ unique: true })
  public no: string;
  @Column()
  public name: LanguageType;
  @Column()
  public engName: string;
  @Column()
  public image: string;
  @Column()
  public icon: string;
  @Column()
  public stats: Stat[];
  @Column()
  public types: string[];
  @Column()
  public typeDefenses: TypeDefense[];
  @Column()
  public species: string;
  @Column()
  public height: string;
  @Column()
  public weight: string;
  @Column()
  public abilities: string[];
  @Column()
  public hiddenAbility: string;
  @Column()
  public evYield: string;
  @Column()
  public catchRate: number;
  @Column()
  public friendship: number;
  @Column()
  public exp: number;
  @Column()
  public eegGroups: string[];
  @Column()
  public gender: Gender[];
  @Column()
  public eggCycles: EggCycle;
  @Column()
  public form: string;
  @Column()
  public evolvingTo: EvolvingTo[];
  @Column()
  public differentForm: DifferentForm[];
  @Column()
  public createdAt: number;
  @Column()
  public searchCount: number;
}
