import { Injectable } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endpoint } from 'src/endpoint/entities/endpoint.entity';

@Injectable()
export class EndpointService {
  constructor(
    @InjectRepository(Endpoint)
    private endPointRepository: Repository<Endpoint>,
  ) {}
  create(createEndpointDto: CreateEndpointDto) {
    const endpoint = new Endpoint();
    Object.assign(endpoint, createEndpointDto);
    return this.endPointRepository.save(endpoint);
  }

  findAll() {
    return this.endPointRepository.find();
  }
}
