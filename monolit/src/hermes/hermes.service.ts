import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHermesDto } from './dto/create-hermes.dto';
import { UpdateHermesDto } from './dto/update-hermes.dto';
import { Hermes } from './entities/hermes.entity';

@Injectable()
export class HermesService {
  constructor(
    @InjectRepository(Hermes) private readonly hermesRepository: Repository<Hermes>,
  ) {}

  createHermes(createHermesDto: CreateHermesDto): Promise<Hermes> {
    const hermes: Hermes = new Hermes();
    hermes.filme = createHermesDto.filme;
    return this.hermesRepository.save(hermes);
  }

  findAllHermes(): Promise<Hermes[]> {
    return this.hermesRepository.find();
  }

  viewHermes(id: number): Promise<Hermes> {
    return this.hermesRepository.findOneBy({ id });
  }

  updateHermes(id: number, updateHermesDto: UpdateHermesDto): Promise<Hermes> {
    const hermes: Hermes = new Hermes();
    hermes.filme = updateHermesDto.filme;
    hermes.id = id;
    return this.hermesRepository.save(hermes);
  }

  removeHermes(id: number): Promise<{ affected?: number }> {
    return this.hermesRepository.delete(id);
  }
}