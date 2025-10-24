import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  getAll() {
    return this.accountsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.accountsService.getById(id);
  }

  @Post()
  create(@Body() data: any, @Req() req: any) {
    return this.accountsService.create(data, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.accountsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accountsService.delete(id);
  }
}
