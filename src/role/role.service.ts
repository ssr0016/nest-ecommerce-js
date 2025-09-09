import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    Object.assign(role, createRoleDto);
    return this.roleRepository.save(role);
  }

  async getRole(name: string) {
    const role = await this.roleRepository.findOne({
      where: { name, isActive: true },
      relations: { users: true },
    });

    if (!role) throw new NotFoundException(`No role ${name} found`);

    return role;
  }

  async findAll() {
    const roles = await this.roleRepository.find({ where: { isActive: true } });
    return roles;
  }

  async update(name: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(name);

    role.description = updateRoleDto.description;

    return this.roleRepository.save(role);
  }

  async remove(name: string) {
    // soft delete
    const role = await this.getRole(name);

    if (role.users?.length > 0)
      throw new BadRequestException(`Cannot remove role ${name}`);

    // User 1 -> admin
    // User 2 -> user
    //        -> management

    role.isActive = false;
    await this.roleRepository.save(role);
  }
}
