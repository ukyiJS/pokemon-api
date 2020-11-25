import { ArgsType, Field } from '@nestjs/graphql';
import { DisplayArgs } from './display.args';

@ArgsType()
export class AutoCompleteArgs extends DisplayArgs {
  @Field()
  public keyword: string;
}
