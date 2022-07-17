import { env } from './../utils/envToString';

export interface DatabaseConfiguration {
  APP_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
}

export const databaseConfiguration: DatabaseConfiguration = {
  POSTGRES_PORT: env.convert(process.env.POSTGRES_PORT) || 5432,
  POSTGRES_HOST: env.convert(process.env.POSTGRES_HOST) || '127.0.0.1',
  POSTGRES_USER: env.convert(process.env.POSTGRES_USER) || 'postgres',
  POSTGRES_PASSWORD: env.convert(process.env.POSTGRES_PASSWORD) || 'login@123',
  POSTGRES_DATABASE: env.convert(process.env.POSTGRES_DATABASE) || 'company',
  APP_PORT: env.convert(process.env.APP_PORT) || 3000,
};
