import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComptoirService } from './comptoir.service';
import { CreateComptoirDto } from './dto/create-comptoir.dto';
import { UpdateComptoirDto } from './dto/update-comptoir.dto';

@Controller('comptoir')
export class ComptoirController {
  constructor(private readonly comptoirService: ComptoirService) {}

  @Post()
  create(@Body() createComptoirDto: CreateComptoirDto) {
    return this.comptoirService.create(createComptoirDto);
  }

  @Get()
  findAll() {
    return this.comptoirService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comptoirService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComptoirDto: UpdateComptoirDto) {
    return this.comptoirService.update(+id, updateComptoirDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comptoirService.remove(+id);
  }
}
