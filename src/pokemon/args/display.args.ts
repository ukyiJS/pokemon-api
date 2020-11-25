import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class DisplayArgs {
  @Field(() => Int, { defaultValue: 10 })
  @Min(5)
  @Max(100)
  public display = 10;
}
