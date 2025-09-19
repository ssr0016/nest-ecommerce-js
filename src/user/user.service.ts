import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RoleService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.getRole('user');

    const user = new User();

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    Object.assign(user, { ...createUserDto, password: hashedPassword, role });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async findAll() {
    return this.usersRepository.find({
      relations: { role: true },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { role: true },
    });

    if (!user) throw new NotFoundException(`No user ${id} found`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    user.firstName = updateUserDto.firstName
      ? updateUserDto.firstName
      : user.firstName;
    user.lastName = updateUserDto.lastName
      ? updateUserDto.lastName
      : user.lastName;

    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
