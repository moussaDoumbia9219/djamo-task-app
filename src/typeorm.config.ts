import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(process.env);

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: true,
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
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
};

export = typeOrmConfig;
