import { ApiProperty } from "@nestjs/swagger";
import { TankType } from "./tank.entity";

export class CreateTankDto {
    @ApiProperty({ description: "The name of the tank", example: "Tank 1" })
    public name: string;

    @ApiProperty({ description: "The calibre of the tank", example: 100 })
    public calibre: number;

    @ApiProperty({ description: "The type of the tank", enum: TankType, example: TankType.HEAVY })
    public type: TankType;

    @ApiProperty({ description: "The weak spots of the tank", example: 4 })
    public weakSpots: number;
}
