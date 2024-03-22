import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

// NOTE: Initialize config -->
config();

const {
  APP_DATABASE__HOST,
  APP_DATABASE__PORT,
  APP_DATABASE__USERNAME,
  APP_DATABASE__PASSWORD,
  APP_DATABASE__DATABASE,
} = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: APP_DATABASE__HOST,
  port: Number(APP_DATABASE__PORT || 3000),
  username: APP_DATABASE__USERNAME,
  password: APP_DATABASE__PASSWORD,
  database: APP_DATABASE__DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export { dataSource, dataSourceOptions };
