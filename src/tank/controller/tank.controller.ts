import { Controller, Get } from "@nestjs/common";
import { TankService } from "../service/tank.service";
import { TankResponse } from "../types/tank.response";

@Controller("tanks")
export class TankController {
  constructor(private readonly tankService: TankService) {}

  @Get("/all")
  public findAll(): Promise<TankResponse[]> {
    return this.tankService.findAll();
  }

}
