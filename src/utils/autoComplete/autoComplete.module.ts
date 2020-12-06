import { Module } from '@nestjs/common';
import { AutoCompleteService } from './autoComplete.service';

@Module({
  providers: [AutoCompleteService],
  exports: [AutoCompleteService],
})
export class AutoCompleteModule {}
