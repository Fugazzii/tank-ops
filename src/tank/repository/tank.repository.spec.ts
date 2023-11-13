import { Test, TestingModule } from '@nestjs/testing';
import { TankRepository } from './tank.repository';
import { TankType } from '../types/tank.entity';
import { TankResponse } from '../types/tank.response';

describe('TankRepository', () => {
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
        TankRepository,
        {
          provide: TankRepository,
          useValue: mockTankRepository,
        },
      ],
    }).compile();

    tankRepository = module.get<TankRepository>(TankRepository);
  });

  it('should be defined', () => {
    expect(tankRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tank responses', async () => {
      const result = await tankRepository.findAll();

      expect(result).toEqual(mockTankResponse);
    });

    it('should call findAll method of the repository', async () => {
      await tankRepository.findAll();

      expect(mockTankRepository.findAll).toHaveBeenCalled();
    });
  });
});
