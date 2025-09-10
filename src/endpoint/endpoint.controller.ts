import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { HttpAdapterHost } from '@nestjs/core';

@Controller('api/v1/endpoints')
export class EndpointController {
  constructor(
    private readonly endpointService: EndpointService,
    private readonly adapterHost: HttpAdapterHost,
  ) {}

  @Post()
  create(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.create(createEndpointDto);
  }

  @Get()
  findAll() {
    return this.endpointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.endpointService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEndpointDto: UpdateEndpointDto,
  ) {
    return this.endpointService.update(+id, updateEndpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.endpointService.remove(+id);
  }
}
