import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { CommentController } from './comment.controller';
import { LikeController } from './like.controller';
import applicationConfig from './app.config';
import { ConfigModule } from '@nestjs/config';

const ENV_API_FILE_PATH = 'apps/api/.env';
@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [applicationConfig],
      envFilePath: ENV_API_FILE_PATH
    }),

  ],
  controllers: [UsersController,BlogController,CommentController,LikeController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
