import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { AccountsModule } from './accounts/accounts.module';
import { ActivitiesModule } from './activities/activities.module';
import { UpdatesModule } from './updates/updates.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    LeadsModule,
    AccountsModule,
    ActivitiesModule,
    UpdatesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
