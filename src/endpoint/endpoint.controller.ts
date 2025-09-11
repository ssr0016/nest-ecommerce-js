import { Controller, Request, Get, Body, Post } from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { CreateEndpointDto } from 'src/endpoint/dto/create-endpoint.dto';

@Controller('api/v1/endpoints')
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Get('/all')
  async getAllRoutes() {
    const routes = await this.endpointService.findAll();
    return routes;
  }

  @Post()
  async create(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.create(createEndpointDto);
  }
}
