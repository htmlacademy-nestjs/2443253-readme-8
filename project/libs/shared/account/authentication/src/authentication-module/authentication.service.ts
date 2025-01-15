import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '@project/account-config';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenPayload, User } from '@project/core';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,

  ) {
    // Извлекаем настройки из конфигурации
    console.log(databaseConfig.host);
    console.log(databaseConfig.user);
  }


//Регистрация нового пользователя
public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
      const {email, userName, password} = dto;

      const blogUser = {
        email, userName, avatar: '', passwordHash: '', subscribers:[]
      };

      const existUser = await this.blogUserRepository
        .findByEmail(email);

      if (existUser) {
        throw new ConflictException(AUTH_USER_EXISTS);
      }

      const userEntity = await new BlogUserEntity(blogUser)
        .setPassword(password)
        this.blogUserRepository
        .save(userEntity);
        return userEntity;

    }


    public async verifyUser(dto: LoginUserDto) {
      const {email, password} = dto;
      const existUser = await this.blogUserRepository.findByEmail(email);

      if (!existUser) {
        throw new NotFoundException(AUTH_USER_NOT_FOUND);
      }

      if (!await existUser.comparePassword(password)) {
        throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
      }

      return existUser;
    }

    public async getUser(id: string) {
      const user = await this.blogUserRepository.findById(id);

      if (! user) {
        throw new NotFoundException(AUTH_USER_NOT_FOUND);
      }

      return user;
    }

    public async createUserToken(user: User): Promise<Token> {
      const payload: TokenPayload = {
        sub: user.id,
        email: user.email,
        userName: user.userName,
      };

      try {
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
      } catch (error) {
        this.logger.error('[Token generation error]: ' + error.message);
        throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

