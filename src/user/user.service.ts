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
import { ChangePwdUserDto } from 'src/user/dto/change-pwd-user.dto';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { SALT } from 'src/_cores/constants/app.constant';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService: RoleService,
    private cartService: CartService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.getRole('user');

    const user = new User();

    const hashedPassword = await bcrypt.hash(createUserDto.password, SALT);

    Object.assign(user, { ...createUserDto, password: hashedPassword, role });

    const userSaved = await this.usersRepository.save(user);

    await this.cartService.create(userSaved);

    return userSaved;
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

  async updateMe(currentUser: UserPayload, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(currentUser.id);

    user.firstName = updateUserDto.firstName
      ? updateUserDto.firstName
      : user.firstName;
    user.lastName = updateUserDto.lastName
      ? updateUserDto.lastName
      : user.lastName;

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.softRemove(user);
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async changePassword(
    changePwdUserDto: ChangePwdUserDto,
    currentUser: UserPayload,
  ) {
    const user = await this.findOne(currentUser.id);

    const { currentPassword, newPassword, confirmPassword } = changePwdUserDto;

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) throw new BadRequestException(`'Wrong password`);

    if (newPassword !== confirmPassword)
      throw new BadRequestException(`Password don't match`);

    const hashedPassword = await bcrypt.hash(newPassword, SALT);

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}
