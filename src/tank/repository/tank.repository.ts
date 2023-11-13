import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tank } from "../types/tank.entity";
import { Repository } from "sequelize-typescript";
import { TankResponse } from "../types/tank.response";

@Injectable()
export class TankRepository {
    public constructor(
        @InjectModel(Tank) private readonly repository: Repository<Tank>
    ) {}

    public async findAll(): Promise<TankResponse[]> {
        const allTanks = await this.repository.findAll();
        const result = allTanks.map((tank: Tank) => {
            const { id, name, calibre, type } = tank;
            return { id, name, calibre, type };
        });
        return result;
    }
    
}