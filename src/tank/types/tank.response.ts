import { TankType } from "./tank.entity";

export class TankResponse {
    public id: number;
    public name: string;
    public calibre: number;
    public type: TankType;
}