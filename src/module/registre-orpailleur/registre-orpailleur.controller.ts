import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistreOrpailleurService } from './registre-orpailleur.service';
import { CreateRegistreOrpailleurDto } from './dto/create-registre-orpailleur.dto';
import { UpdateRegistreOrpailleurDto } from './dto/update-registre-orpailleur.dto';

@Controller('registre-orpailleur')
export class RegistreOrpailleurController {
  constructor(private readonly registreOrpailleurService: RegistreOrpailleurService) {}

  @Post()
  create(@Body() createRegistreOrpailleurDto: CreateRegistreOrpailleurDto) {
    return this.registreOrpailleurService.create(createRegistreOrpailleurDto);
  }

  @Get()
  findAll() {
    return this.registreOrpailleurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registreOrpailleurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistreOrpailleurDto: UpdateRegistreOrpailleurDto) {
    return this.registreOrpailleurService.update(+id, updateRegistreOrpailleurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registreOrpailleurService.remove(+id);
  }
}
