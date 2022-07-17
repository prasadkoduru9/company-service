import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    try {
      const { username, password } = createUserDto;
      const salt = await bcrypt.genSalt();
      const hashedpwd = await bcrypt.hash(password, salt);

      createUserDto.password = hashedpwd;
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code == 23505) {
        throw new ConflictException('User name already exits!!!');
      }
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken }> {
    const { username, password } = createUserDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Please check your login credentials ...',
      );
    }
  }

  async findAll(): Promise<User[]> {
    const resultSet = await this.userRepository.find();
    return resultSet;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
