import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Repository } from "sequelize-typescript";
import { CreateTankDto } from "../types/create-tank.dto";
import { Tank } from "../types/tank.entity";
import { TankResponse } from "../types/tank.response";
import { Client } from "@elastic/elasticsearch";
import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

@Injectable()
export class TankRepository {
    private readonly elasticsearchClient: Client;

    public constructor(
        @InjectModel(Tank) private readonly repository: Repository<Tank>
    ) {
        this.elasticsearchClient = new Client({ node: "http://elasticsearch:9200" });
    }

    public async findAll(): Promise<TankResponse[]> {
        const allTanks = await this.repository.findAll();
        const result = allTanks.map((tank: Tank) => {
            const { id, name, calibre, type } = tank;
            return { id, name, calibre, type };
        });
        return result;
    }

    public async create(createTankDto: CreateTankDto): Promise<void> {
        await this.repository.create(createTankDto);
    }

    public async search(query: string): Promise<Tank[]> {
        const body = await this.elasticsearchClient.search({
            index: "your_index",
            body: {
                query: {
                    match: {
                        name: query
                    }
                }
            }
        });

        return body.hits.hits.map<Tank>((hit: SearchHit<Tank>) => hit._source);
    }
}
