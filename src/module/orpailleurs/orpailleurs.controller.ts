import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrpailleursService } from './orpailleurs.service';
import { CreateOrpailleurDto } from './dto/create-orpailleur.dto';
import { UpdateOrpailleurDto } from './dto/update-orpailleur.dto';

@Controller('orpailleurs')
export class OrpailleursController {
  constructor(private readonly orpailleursService: OrpailleursService) {}

  @Post()
  create(@Body() createOrpailleurDto: CreateOrpailleurDto) {
    return this.orpailleursService.create(createOrpailleurDto);
  }

  @Get()
  findAll() {
    return this.orpailleursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orpailleursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrpailleurDto: UpdateOrpailleurDto) {
    return this.orpailleursService.update(+id, updateOrpailleurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orpailleursService.remove(+id);
  }
}
