
export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;

import { registerAs } from '@nestjs/config';
import { DefaultAppPorts } from '@project/shareable';
import Joi from 'joi';


const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
  users : string;
  blog : string;
  comment : string;
  like : string;
  notify : string;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DefaultAppPorts.Api),
  users: Joi.string().required(),
  blog: Joi.string().required(),
  comment: Joi.string().required(),
  like: Joi.string().required(),
  notify: Joi.string().required(),
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DefaultAppPorts.Api}`, 10),
    users : process.env.ACCOUNTS_POINT,
    blog : process.env.BLOG_POINT,
    comment : process.env.COMMENT_POINT,
    like : process.env.LIKE_POINT,
    notify : process.env.NOTIFY_POINT,
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
