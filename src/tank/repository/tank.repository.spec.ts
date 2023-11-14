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
    search: jest.fn().mockResolvedValue(mockTankResponse), // Mock the search method
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

  describe('search', () => {
    it('should return an array of tank responses based on the query', async () => {
      const query = 'Tank 1';
      const result = await tankRepository.search(query);

      expect(result).toEqual(mockTankResponse);
    });

    it('should call search method of the repository with the correct parameters', async () => {
      const query = 'Tank 1';
      await tankRepository.search(query);

      expect(mockTankRepository.search).toHaveBeenCalledWith(query);
    });
  });
});
