import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';

@Module({
  imports: [LocalizationService],
  controllers: [],
  providers: [LocalizationService],
  exports: [LocalizationService],
})
export class LocalizationModule {}
