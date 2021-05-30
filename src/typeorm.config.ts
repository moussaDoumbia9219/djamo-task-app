import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'batyr.db.elephantsql.com',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'cqzcfpvd',
  password: process.env.DB_PASSWORD || 'kcM85y95gx4SWNi_aOjptNUobQLbbuOS',
  database: process.env.POSTGRES_DB || 'cqzcfpvd',
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
