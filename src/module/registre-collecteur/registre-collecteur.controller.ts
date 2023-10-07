import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistreCollecteurService } from './registre-collecteur.service';
import { CreateRegistreCollecteurDto } from './dto/create-registre-collecteur.dto';
import { UpdateRegistreCollecteurDto } from './dto/update-registre-collecteur.dto';

@Controller('registre-collecteur')
export class RegistreCollecteurController {
  constructor(private readonly registreCollecteurService: RegistreCollecteurService) {}

  @Post()
  create(@Body() createRegistreCollecteurDto: CreateRegistreCollecteurDto) {
    return this.registreCollecteurService.create(createRegistreCollecteurDto);
  }

  @Get()
  findAll() {
    return this.registreCollecteurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registreCollecteurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistreCollecteurDto: UpdateRegistreCollecteurDto) {
    return this.registreCollecteurService.update(+id, updateRegistreCollecteurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registreCollecteurService.remove(+id);
  }
}
