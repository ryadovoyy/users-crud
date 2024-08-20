import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../../api/user/user-model';

const dbFilepath = process.env.DB_FILEPATH || '';
const isDev = process.env.NODE_ENV === 'development';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: dbFilepath,
  synchronize: isDev,
  logging: isDev ? 'all' : ['error'],
  maxQueryExecutionTime: 1000,
  entities: [User],
});

const initConnection = async () => {
  await dataSource.initialize();
  console.log('Database connection initialized');
};

initConnection().catch((err) => {
  console.error(`Database connection failed: ${err}`);
});
