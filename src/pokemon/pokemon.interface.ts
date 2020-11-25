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

export interface IPokemonOfDatabase {
  no: string;
  name: string;
  engName: string;
  image: string;
  icon?: string;
  stats: IStat[];
  types: string[];
  typeDefenses: ITypeDefense[];
  species: string;
  height: string;
  weight: string;
  abilities: string[];
  hiddenAbility: string | null;
  evYield: string | null;
  catchRate: number;
  friendship: number;
  exp: number;
  eegGroups: string[];
  gender: IGender[];
  eggCycles: IEggCycle;
  evolvingTo?: IEvolvingTo[];
  form: string | null;
  differentForm: IPokemonOfDatabase[];
}
