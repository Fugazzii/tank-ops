import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TankService } from './tank.service';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';

@Controller('tank')
export class TankController {
  constructor(private readonly tankService: TankService) {}

  @Post()
  create(@Body() createTankDto: CreateTankDto) {
    return this.tankService.create(createTankDto);
  }

  @Get()
  findAll() {
    return this.tankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tankService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTankDto: UpdateTankDto) {
    return this.tankService.update(+id, updateTankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tankService.remove(+id);
  }
}
