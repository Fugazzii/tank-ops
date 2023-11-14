import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { TankService } from "../service/tank.service";
import { TankResponse } from "../types/tank.response";
import { CreateTankDto } from "../types/create-tank.dto";
import { Tank } from "../types/tank.entity";

@Controller("tanks")
export class TankController {
  
  public constructor(private readonly tankService: TankService) {}

  @Get("/all")
  public findAll(): Promise<TankResponse[]> {
    return this.tankService.findAll();
  }

  @Post("/tank")
  public createTank(@Body() createTankDto: CreateTankDto): Promise<void> {
    return this.tankService.createTank(createTankDto);
  }

  @Get("/search")
  public search(@Query("search") query: string): Promise<Tank[]> {
    return this.tankService.search(query);
  }

}
