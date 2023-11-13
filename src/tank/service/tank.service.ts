import { Injectable } from '@nestjs/common';
import { TankRepository } from '../repository/tank.repository';
import { TankResponse } from '../types/tank.response';

@Injectable()
export class TankService {

  public constructor(
    private readonly tankRepository: TankRepository
  ) {}

  public findAll(): Promise<TankResponse[]> {
    return this.tankRepository.findAll();
  }

}
