import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import applicationConfig from './configurations/app.config';
import mongoConfig from "./configurations/mongo.config";
import JWTConfig from "./configurations/jwt.config";

const ENV_USERS_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // TODO: Передать список конфигураций для загрузки
      load: [applicationConfig,mongoConfig,JWTConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class AccountConfigModule {}
