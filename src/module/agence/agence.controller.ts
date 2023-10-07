import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';

@Controller('agence')
export class AgenceController {
  constructor(private readonly agenceService: AgenceService) {}

  @Post()
  create(@Body() createAgenceDto: CreateAgenceDto) {
    return this.agenceService.create(createAgenceDto);
  }

  @Get()
  findAll() {
    return this.agenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgenceDto: UpdateAgenceDto) {
    return this.agenceService.update(+id, updateAgenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agenceService.remove(+id);
  }
}
