import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnorService } from './anor.service';
import { CreateAnorDto } from './dto/create-anor.dto';
import { UpdateAnorDto } from './dto/update-anor.dto';

@Controller('anor')
export class AnorController {
  constructor(private readonly anorService: AnorService) {}

  @Post()
  create(@Body() createAnorDto: CreateAnorDto) {
    return this.anorService.create(createAnorDto);
  }

  @Get()
  findAll() {
    return this.anorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnorDto: UpdateAnorDto) {
    return this.anorService.update(+id, updateAnorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anorService.remove(+id);
  }
}
