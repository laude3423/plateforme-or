import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollecteursService } from './collecteurs.service';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';

@Controller('collecteurs')
export class CollecteursController {
  constructor(private readonly collecteursService: CollecteursService) {}

  @Post()
  create(@Body() createCollecteurDto: CreateCollecteurDto) {
    return this.collecteursService.create(createCollecteurDto);
  }

  @Get()
  findAll() {
    return this.collecteursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collecteursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollecteurDto: UpdateCollecteurDto) {
    return this.collecteursService.update(+id, updateCollecteurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collecteursService.remove(+id);
  }
}
