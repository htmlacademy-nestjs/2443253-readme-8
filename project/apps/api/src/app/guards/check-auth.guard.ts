import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import applicationConfig from './../app.config';
import { ConfigType } from '@nestjs/config';



@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    @Inject(applicationConfig.KEY) private readonly applicationsOptions: ConfigType<typeof applicationConfig>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${this.applicationsOptions.users}/check`, {}, {

      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    request['user'] = data;
    return true;
  }
}
