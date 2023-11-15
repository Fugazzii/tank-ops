import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { TankService } from "../service/tank.service";
import { TankResponse } from "../types/tank.response";
import { CreateTankDto } from "../types/create-tank.dto";
import { Tank } from "../types/tank.entity";

@ApiTags("Tanks")
@Controller("tanks")
export class TankController {
  public constructor(private readonly tankService: TankService) {}

  @ApiOperation({ summary: "Get all tanks", description: "Returns a list of all tanks." })
  @ApiResponse({ status: 200, description: "Successful operation", type: TankResponse, isArray: true })
  @HttpCode(HttpStatus.OK)
  @Get("/all")
  public findAll(): Promise<TankResponse[]> {
    return this.tankService.findAll();
  }

  @ApiOperation({ summary: "Create a new tank", description: "Creates a new tank." })
  @ApiResponse({ status: 201, description: "Successfully created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @HttpCode(HttpStatus.CREATED)
  @Post("/tank")
  public createTank(@Body() createTankDto: CreateTankDto): Promise<void> {
    return this.tankService.createTank(createTankDto);
  }

  @ApiOperation({ summary: "Search for tanks", description: "Searches for tanks based on the provided query." })
  @ApiQuery({ name: "search", description: "Search query", required: true })
  @ApiResponse({ status: 200, description: "Successful operation", type: Tank, isArray: true })
  @HttpCode(HttpStatus.OK)
  @Get("/search")
  public search(@Query("search") query: string): Promise<Tank[]> {
    return this.tankService.search(query);
  }
}
