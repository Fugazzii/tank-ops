import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { CreateTankDto } from "src/tank/types/create-tank.dto";

export enum TankType {
  LIGHT,
  MEDIUM,
  HEAVY
}

describe("TankController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/tanks/all (GET)", async () => {
    const response = await request(app.getHttpServer()).get("/tanks/all").expect(200);

    expect(response.body).toEqual([
      { id: 1, name: "Tank 1", calibre: 100, type: TankType.HEAVY },
      { id: 2, name: "Tank 2", calibre: 75, type: TankType.MEDIUM }
    ]);
  });

  it("/tanks/tank (POST)", async () => {
    const createTankDto: CreateTankDto = {
      name: "New Tank",
      calibre: 90,
      type: TankType.MEDIUM, 
      weakSpots: 4
    };

    const response = await request(app.getHttpServer())
      .post("/tanks/tank")
      .send(createTankDto)
      .expect(201);
      
    expect(response.body).toBeDefined();
  });

  it("/tanks/search (GET)", async () => {
    const query = "Tank 1";

    const response = await request(app.getHttpServer())
      .get("/tanks/search")
      .query({ search: query })
      .expect(200);

    expect(response.body).toEqual([
      { id: 1, name: "Tank 1", calibre: 100, type: TankType.HEAVY },
    ]);
  });
});
