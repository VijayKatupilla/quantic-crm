import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts/:accountId/activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getAll(@Param('accountId') accountId: string) {
    return this.activitiesService.getAll(accountId);
  }

  @Post()
  create(
    @Param('accountId') accountId: string,
    @Body() data: any,
    @Req() req: any,
  ) {
    return this.activitiesService.create(accountId, data, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.activitiesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.activitiesService.delete(id);
  }
}
