import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { FileUploaderService } from './file-uploader.service';

import { ConfigService } from '@nestjs/config';

const SERVE_ROOT = '/static';
@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('application.uploadDirectory');
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    })


],
  providers: [
    FileUploaderService,
  ],
  controllers: [],
  exports: [FileUploaderService]

})
export class FileUploaderModule {}
