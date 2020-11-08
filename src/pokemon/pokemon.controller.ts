import { Controller, Get, Logger, Redirect } from '@nestjs/common';

@Controller()
export class PokemonController {
  @Get()
  @Redirect('graphql')
  public index(): void {
    Logger.log('Graphql Playground', 'Graphql');
  }
}
