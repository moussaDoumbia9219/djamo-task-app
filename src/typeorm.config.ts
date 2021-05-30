import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host:
    process.env.POSTGRES_HOST || 'ec2-23-23-128-222.compute-1.amazonaws.com',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'opzchgufhbrphp',
  password:
    process.env.DB_PASSWORD ||
    '842579378d06638ff42bffafd069ab22fe5aa233be4d53cbc74dc089570a8ba0',
  database: process.env.POSTGRES_DB || 'df71n0m8v06anb',
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'migration',
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migration',
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export = typeOrmConfig;
