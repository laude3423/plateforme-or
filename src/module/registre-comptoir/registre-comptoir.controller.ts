import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistreComptoirService } from './registre-comptoir.service';
import { CreateRegistreComptoirDto } from './dto/create-registre-comptoir.dto';
import { UpdateRegistreComptoirDto } from './dto/update-registre-comptoir.dto';

@Controller('registre-comptoir')
export class RegistreComptoirController {
  constructor(private readonly registreComptoirService: RegistreComptoirService) {}

  @Post()
  create(@Body() createRegistreComptoirDto: CreateRegistreComptoirDto) {
    return this.registreComptoirService.create(createRegistreComptoirDto);
  }

  @Get()
  findAll() {
    return this.registreComptoirService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registreComptoirService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistreComptoirDto: UpdateRegistreComptoirDto) {
    return this.registreComptoirService.update(+id, updateRegistreComptoirDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registreComptoirService.remove(+id);
  }
}
