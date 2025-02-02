import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NOTIFY_NEW_POSTS } from './mail.constant';
import { EmailSubscriberEntity } from '../email-subscriber.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.userName}`,
        email: `${subscriber.email}`,
      }
    })
  }
  public async sendNotifyNewPosts(subscribers: EmailSubscriberEntity[],publications:string) {
    for (const subscriber of subscribers) {
      await this.mailerService.sendMail({
        from: this.notifyConfig.mail.from,
        to: subscriber.email,
        subject: EMAIL_NOTIFY_NEW_POSTS,
        template: './new-publications',
        context: {
          user: `${subscriber.userName}`,
          publications: `${publications}`,
      }
    })
    }
  }
}
