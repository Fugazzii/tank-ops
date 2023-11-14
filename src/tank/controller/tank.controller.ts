import { Body, Controller, Get, Post } from "@nestjs/common";
import { TankService } from "../service/tank.service";
import { TankResponse } from "../types/tank.response";
import { CreateTankDto } from "../types/create-tank.dto";

@Controller("tanks")
export class TankController {
  constructor(private readonly tankService: TankService) {}

  @Get("/all")
  public findAll(): Promise<TankResponse[]> {
    return this.tankService.findAll();
  }

  @Post("/tank")
  public createTank(@Body() createTankDto: CreateTankDto): Promise<void> {
    return this.tankService.createTank(createTankDto);
  }

}
