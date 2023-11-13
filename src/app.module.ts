import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TankModule } from './tank/tank.module';

@Module({
  imports: [TankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
