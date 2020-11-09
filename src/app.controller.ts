import { Controller, Get, Logger, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('api/graphql')
  public redirectGraphQL(): null {
    Logger.log('graphql', 'graphql');
    return null;
  }

  @Get('api')
  public test(): void {
    Logger.log('test', 'test');
  }
}
