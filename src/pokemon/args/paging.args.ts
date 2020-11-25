import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { DisplayArgs } from './display.args';

@ArgsType()
export class PagingArgs extends DisplayArgs {
  @Field(() => Int, { defaultValue: 1 })
  @Min(1)
  @Max(200)
  public page = 1;
}
