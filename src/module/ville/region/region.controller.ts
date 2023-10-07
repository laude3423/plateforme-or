import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return await this.regionService.create(createRegionDto);
  }

  @Get()
  async findAll() {
    return await this.regionService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.regionService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
