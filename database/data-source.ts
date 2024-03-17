import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from 'dotenv';

// NOTE: Initialize config -->
config();

const {
  APP_DB__HOST,
  APP_DB__PORT,
  APP_DB__USERNAME,
  APP_DB__PASSWORD,
  APP_DB__DATABASE,
} = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: APP_DB__HOST,
  port: Number(APP_DB__PORT),
  username: APP_DB__USERNAME,
  password: APP_DB__PASSWORD,
  database: APP_DB__DATABASE,
  entities: [],
  migrations: [],
  logging: true,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export { dataSource, dataSourceOptions };
