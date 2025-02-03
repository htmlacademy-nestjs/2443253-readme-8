import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@project/blog-user';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/account-config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { NotifyModule } from '@project/account-notify';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { FileUploaderModule,FileUploaderService} from '@project/file-uploader';


@Module({
  imports: [BlogUserModule,
    FileUploaderModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,
    JwtAccessStrategy,LocalStrategy,JwtRefreshStrategy,FileUploaderService
  ]

})
export class AuthenticationModule {}
