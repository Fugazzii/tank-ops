import { Module } from '@nestjs/common';
import { TankService } from './service/tank.service';
import { TankController } from './controller/tank.controller';
import { TankRepository } from './repository/tank.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tank } from './types/tank.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Tank])
  ],
  controllers: [TankController],
  providers: [TankService, TankRepository],
  exports: [TankService, TankRepository]
})
export class TankModule {}
