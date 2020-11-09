import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('api/graphql')
  public redirectGraphQL(): null {
    return null;
  }
}
