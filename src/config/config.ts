import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: 'postgres' as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [],
  migrations: [__dirname + '/../database/migration/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'database/migration',
  },
  synchronize: process.env.DB_SYNC === 'true',
  ssl: false,
}));
