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
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  // findAll() {
  //   return this.districtService.findAll();
  // }
  @Get()
  findAll(@Query() query: any, @Req() req: Request) {
    return this.districtService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.districtService.findOne(+id);
  }

  //recherche district par region
  @Get('region/:regionId')
  async getDistrictsByRegion(@Param('regionId') regionId: number) {
    return await this.districtService.getDistrictsByRegion(regionId);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.districtService.remove(+id);
  }
}
