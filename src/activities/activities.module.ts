import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { DatabaseModule } from '../database/database.module';
import { UpdatesModule } from '../updates/updates.module';

@Module({
  imports: [DatabaseModule, UpdatesModule],
  providers: [ActivitiesService],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
