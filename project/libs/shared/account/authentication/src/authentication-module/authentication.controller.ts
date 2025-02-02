import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponseMessage } from './authentication.constant';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/helpers';
import { NotifyService } from '@project/account-notify';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';
import { ChangePasswordUserDto } from '../dto/change-password.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(protected readonly authService:AuthenticationService,
  private readonly notifyService: NotifyService,
  ){
}

@ApiResponse({
  status: HttpStatus.CREATED,
  description: AuthenticationResponseMessage.UserCreated,
})
@ApiResponse({
  status: HttpStatus.CONFLICT,
  description: AuthenticationResponseMessage.UserExist,
})
@Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, userName } = newUser;
    await this.notifyService.registerSubscriber({ email, userName });
    return newUser.toPOJO();
  }

  @Post('notifynewposts')
  public async notifyNewPosts(@Body() newPublications: string) {
    await this.notifyService.notifyAboutNewPosts(newPublications);
  }

  @Post('subscribe/:id/:userId')
  public async subscribe(@Param('id') subscribeId: string,@Param('userId') userId: string) {
    const user = await this.authService.subscribe(subscribeId,userId);
    return user.toPOJO();
  }

  @Post('unsubscribe/:id/:userId')
  public async unsubscribe(@Param('id') unSubscribeId: string,@Param('userId') userId: string) {
    const user = await this.authService.unSubscribe(unSubscribeId,userId);
    return user.toPOJO();
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
    public async login(@Req() { user }: RequestWithUser) {
      const userToken = await this.authService.createUserToken(user);
      return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.PasswordChangeSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.PasswordChangeError,
  })
  @UseGuards(LocalAuthGuard)
  @Post('changepassword')
    public async changePassword(@Body() dto:ChangePasswordUserDto) {
      const newPassUser = await this.authService.changePassword(dto);
      const userToken = await this.authService.createUserToken(newPassUser);
      return fillDto(LoggedUserRdo, { ...newPassUser.toPOJO(), ...userToken });
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id',MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return existUser.toPOJO();
  }
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
}

@UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
