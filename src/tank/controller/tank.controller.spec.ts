import { Test, TestingModule } from '@nestjs/testing';
import { TankController } from './tank.controller';
import { TankService } from '../service/tank.service';
import { TankResponse } from '../types/tank.response';
import { TankType } from '../types/tank.entity';

describe('TankController', () => {
  let tankController: TankController;
  let tankService: TankService;

  const mockTankResponse: TankResponse[] = [
    { id: 1, name: 'Tank 1', calibre: 100, type: TankType.HEAVY },
    { id: 2, name: 'Tank 2', calibre: 75, type: TankType.MEDIUM },
  ];

  const mockTankService = {
    findAll: jest.fn().mockResolvedValue(mockTankResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TankController],
      providers: [
        {
          provide: TankService,
          useValue: mockTankService,
        },
      ],
    }).compile();

    tankController = module.get<TankController>(TankController);
    tankService = module.get<TankService>(TankService);
  });

  it('should be defined', () => {
    expect(tankController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tank responses', async () => {
      const result = await tankController.findAll();

      expect(result).toEqual(mockTankResponse);
    });

    it('should call findAll method of the service', async () => {
      await tankController.findAll();

      expect(mockTankService.findAll).toHaveBeenCalled();
    });
  });
});
