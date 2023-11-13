import { Test, TestingModule } from '@nestjs/testing';
import { TankService } from './tank.service';
import { TankRepository } from '../repository/tank.repository';
import { TankResponse } from '../types/tank.response';
import { TankType } from '../types/tank.entity';

describe('TankService', () => {
  let tankService: TankService;
  let tankRepository: TankRepository;

  const mockTankResponse: TankResponse[] = [
    { id: 1, name: 'Tank 1', calibre: 100, type: TankType.HEAVY },
    { id: 2, name: 'Tank 2', calibre: 75, type: TankType.MEDIUM },
  ];

  const mockTankRepository = {
    findAll: jest.fn().mockResolvedValue(mockTankResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TankService,
        {
          provide: TankRepository,
          useValue: mockTankRepository,
        },
      ],
    }).compile();

    tankService = module.get<TankService>(TankService);
    tankRepository = module.get<TankRepository>(TankRepository);
  });

  it('should be defined', () => {
    expect(tankService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tank responses', async () => {
      const result = await tankService.findAll();

      expect(result).toEqual(mockTankResponse);
    });

    it('should call findAll method of the repository', async () => {
      await tankService.findAll();

      expect(mockTankRepository.findAll).toHaveBeenCalled();
    });
  });
});
