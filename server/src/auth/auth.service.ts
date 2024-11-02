import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password: hashedPassword, ...result } = user;

    const isCorrectPassword = bcrypt.compareSync(password, hashedPassword);

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync(result);

    return { accessToken };
  }

  async registration(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      throw new BadRequestException(
        `User with username ${username} already exists`,
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = newUser;
    const accessToken = await this.jwtService.signAsync(result);

    return { accessToken, user: newUser };
  }
}
