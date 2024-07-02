import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
//import { AuthService } from '../auth/auth.service';
import { HermesService } from './hermes.service';
import { CreateHermesDto } from './dto/create-hermes.dto';
import { UpdateHermesDto } from './dto/update-hermes.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('hermes')
export class HermesController {
  constructor(private readonly hermesService: HermesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHermesDto: CreateHermesDto) {
    return this.hermesService.createHermes(createHermesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.hermesService.findAllHermes();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hermesService.viewHermes(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHermesDto: UpdateHermesDto) {
    return this.hermesService.updateHermes(+id, updateHermesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hermesService.removeHermes(+id);
  }
}