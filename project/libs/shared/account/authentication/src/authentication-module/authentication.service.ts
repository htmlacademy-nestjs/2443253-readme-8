import { ConflictException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG, USER_SUBSCRIBE_EXIST } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { applicationConfig, dbConfig } from '@project/account-config';
import { JwtService } from '@nestjs/jwt';
import { Token,  User } from '@project/core';
import { jwtConfig } from '@project/account-config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJWTPayload } from '@project/helpers';
import { ChangePasswordUserDto } from '../dto/change-password.dto';
import { FileUploaderService } from '@project/file-uploader';




@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly fileUploaderService: FileUploaderService,
    private readonly jwtService: JwtService,
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(applicationConfig.KEY) private readonly applicationsOptions: ConfigType<typeof applicationConfig>,


  ) {
    // Извлекаем настройки из конфигурации
    console.log(databaseConfig.host);
    console.log(databaseConfig.user);
  }


//Регистрация нового пользователя
public async register(dto: CreateUserDto, avatarFile?: Express.Multer.File): Promise<BlogUserEntity> {
      const {email, userName, password} = dto;

      const blogUser = {
        email, userName,  avatar: '', passwordHash: '', subscribers:[]
      };

      const existUser = await this.blogUserRepository
        .findByEmail(email);

      if (existUser) {
        throw new ConflictException(AUTH_USER_EXISTS);
      }
      if (avatarFile) {
        try {
          const fileRdo = await this.fileUploaderService.writeFile(avatarFile,this.applicationsOptions.avatarUploadPath);
          blogUser.avatar = fileRdo.path;
        } catch  {
          throw new InternalServerErrorException(`File upload error!`);
        }
      }
      const userEntity = await new BlogUserEntity(blogUser)
        .setPassword(password)
        this.blogUserRepository
        .save(userEntity);
        return userEntity;

    }

//Замена пароля у пользователя
public async changePassword(dto: ChangePasswordUserDto): Promise<BlogUserEntity> {
  const {email, newPassword} = dto;

  const existUser = await this.blogUserRepository.findByEmail(email);
  if (! existUser) {throw new NotFoundException(AUTH_USER_NOT_FOUND);}

  const userEntity = await new BlogUserEntity(existUser)
    .setPassword(newPassword)
    this.blogUserRepository
    .update(userEntity);
    return userEntity;

}

  //Подписаться на другого пользователя
    public async subscribe(subscribeId:string,userId:string): Promise<BlogUserEntity> {

    const existUser = await this.blogUserRepository.findById(userId);

    if (! existUser) {throw new NotFoundException(AUTH_USER_NOT_FOUND);}

    //Проверим есть юзер в списке подписчиков
    const index = existUser.subscribers.indexOf(subscribeId);
    if (index >= 0) {
      throw new NotFoundException(USER_SUBSCRIBE_EXIST)
    }else{
      existUser.subscribers.push(subscribeId)
    }

    await this.blogUserRepository.update(existUser);
    return existUser;

  }


  //Отписаться от другого пользователя
  public async unSubscribe(unSubscribeId:string,userId:string): Promise<BlogUserEntity> {

    const existUser = await this.blogUserRepository.findById(userId);
    if (! existUser) {throw new NotFoundException(AUTH_USER_NOT_FOUND);}

    const index = existUser.subscribers.indexOf(unSubscribeId);
    if (index >= 0) {
      existUser.subscribers.splice( index, 1 );
    }

    await this.blogUserRepository.update(existUser);
    return existUser;

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
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      try {
        const accessToken = await this.jwtService.signAsync(accessTokenPayload);
        const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn
        });

        return { accessToken, refreshToken };
      } catch (error) {
        this.logger.error('[Token generation error]: ' + error.message);
        throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    public async getUserByEmail(email: string) {
      const existUser = await this.blogUserRepository.findByEmail(email);

      if (! existUser) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return existUser;
    }
  }

