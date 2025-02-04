import { registerAs } from '@nestjs/config';
import { DEFAULT_PORT_PUBLICATIONS } from '@project/shareable';
import Joi from 'joi';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_FOTO_UPLOAD_PATH = 'uploads/foto';

type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
  fotoUploadPath : string
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT_PUBLICATIONS),
  fotoUploadPath : Joi.string().required(),
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
    port: parseInt(process.env.PORT || `${DEFAULT_PORT_PUBLICATIONS}`, 10),
    fotoUploadPath : process.env.FOTO_UPLOAD_PATH || DEFAULT_FOTO_UPLOAD_PATH
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
