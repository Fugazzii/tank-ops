import { Injectable } from '@nestjs/common';
import { TankRepository } from '../repository/tank.repository';
import { TankResponse } from '../types/tank.response';
import { CreateTankDto } from '../types/create-tank.dto';
import { Tank } from '../types/tank.entity';

@Injectable()
export class TankService {
  public constructor(
    private readonly tankRepository: TankRepository
  ) {}

  public findAll(): Promise<TankResponse[]> {
    return this.tankRepository.findAll();
  }

  public createTank(createTankDto: CreateTankDto): Promise<void> {
    return this.tankRepository.create(createTankDto);
  }

  public search(query: string): Promise<Tank[]> {
    return this.tankRepository.search(query);
  }
}
