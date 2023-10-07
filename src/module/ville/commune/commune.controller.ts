import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { CommuneService } from './commune.service';
import { CreateCommuneDto } from './dto/create-commune.dto';
import { UpdateCommuneDto } from './dto/update-commune.dto';

@Controller('commune')
export class CommuneController {
  constructor(private readonly communeService: CommuneService) {}

  @Post()
  create(@Body() createCommuneDto: CreateCommuneDto) {
    return this.communeService.createCommune(createCommuneDto);
  }

  @Get()
  findAll(@Query() query: any, @Req() req: Request) {
    return this.communeService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.communeService.findOne(+id);
  }

  @Get('district/:districtId')
  async getCommunesByDistrict(@Param('districtId') districtId: number) {
    return await this.communeService.getCommunesByDistrict(districtId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateCommuneDto: UpdateCommuneDto) {
    return this.communeService.update(+id, UpdateCommuneDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.communeService.remove(+id);
  }
}
