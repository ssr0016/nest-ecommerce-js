import { Controller, Request, Get } from '@nestjs/common';
import { EndpointService } from './endpoint.service';

@Controller('api/v1/endpoints')
export class EndpointController {
  constructor(private readonly endpointService: EndpointService) {}

  @Get('/all')
  async getAllRoutes() {
    const routes = await this.endpointService.findAll();
    return routes;
  }
}
