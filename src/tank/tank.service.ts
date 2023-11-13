import { Injectable } from '@nestjs/common';
import { CreateTankDto } from './dto/create-tank.dto';
import { UpdateTankDto } from './dto/update-tank.dto';

@Injectable()
export class TankService {
  create(createTankDto: CreateTankDto) {
    return 'This action adds a new tank';
  }

  findAll() {
    return `This action returns all tank`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tank`;
  }

  update(id: number, updateTankDto: UpdateTankDto) {
    return `This action updates a #${id} tank`;
  }

  remove(id: number) {
    return `This action removes a #${id} tank`;
  }
}
