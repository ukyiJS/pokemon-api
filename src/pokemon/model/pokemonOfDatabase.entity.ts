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
  public _id?: string;
  @Column({ unique: true })
  public no: string;
  @Column()
  public name: string;
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
  public abilities: (string | null)[];
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
