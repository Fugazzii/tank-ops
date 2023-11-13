import { Module } from '@nestjs/common';
import { TankModule } from './tank/tank.module';

@Module({
  imports: [TankModule],
  controllers: [],
  providers: []
})
export class AppModule {}
