import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeadDto } from './leads.dto';


@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.leadsService.getAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.leadsService.getById(id);
  }

 @Post()
create(@Body() data: LeadDto, @Req() req: any) {
  return this.leadsService.create(data, req.user);
}

@Put(':id')
update(@Param('id') id: string, @Body() data: LeadDto) {
  return this.leadsService.update(id, data);
}


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.leadsService.delete(id);
  }

  @Post(':id/convert')
  convert(@Param('id') id: string) {
    return this.leadsService.convertToAccount(id);
  }
}
