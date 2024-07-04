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

@Controller('api')
export class HermesController {
  constructor(private readonly hermesService: HermesService) {}


  @Get('/getPaintersCombo')
  getPaintersCombo() {

    return this.hermesService.getPaintersCombo();
  }
  
  @Get('/getSculptorsCombo')
  getSculptorsCombo() {
    return this.hermesService.getSculptorsCombo();
  }

  @Get('/getBuildTable')
  getBuildTable() {
    return this.hermesService.getBuildTable();
  }

  @Get('/getCenturyChoices')
  getCenturyChoices() {
    return this.hermesService.getCenturyChoices();
  }
  

  @Get('/getBCbuilds')
  getBCbuilds() {
    return this.hermesService.getBCbuilds();
  }


  

 // @UseGuards(JwtAuthGuard)
  @Get('/getBioArtists/:page')
  getArtists(@Param('page') page: string) {
    let pageNumber = 0
    if (page) {
        pageNumber = parseInt(page) * 3
    }
    return this.hermesService.getBioArtists(pageNumber);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/getAllArts/:id')
  getAllArts(@Param('id') id: string) {
    let id_artitst = id ? parseInt(id) : 1
    return this.hermesService.getAllArts(id_artitst);
  }

  @Get('/getSculpCarousel/:id')
  getSculpCarousel(@Param('id') id: string) {
    let id_artitst = id ? parseInt(id) : 5
    return this.hermesService.getSculpCarousel(id_artitst);
  }

  @Get('/getBuildingDetails/:id')
  getBuildingDetails(@Param('id') id: number) {
    return this.hermesService.getBuildingDetails(id);
  }

  @Get('/getImagesCentury/:cent/:type')
  getImagesCentury(@Param('cent') cent: string, @Param('type') type: string) {
    return this.hermesService.getImagesCentury(cent, type);
  }
  
  
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHermesDto: CreateHermesDto) {
    return this.hermesService.createHermes(createHermesDto);
  }

  //@UseGuards(JwtAuthGuard)
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