import * as dotenv from 'dotenv';
import {DataSource, DataSourceOptions} from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    host: process.env.DB_HOST,
    entities: [
        'dist//*.entity{.ts,.js}',
        'dist///entities/*.entity{.ts,.js}',
        'dist////entities/*.entity{.ts,.js}',
        'dist/**/*.entity.js', 
        'dist//*.entity{.ts,.js}'
      ],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      seeds: [
        // 'dist/database/seeds//*{.ts,.js}',
        'dist/database/seeds/*{.ts,.js}'
      ],
      factories: ['dist/database/factories//*{.ts,.js}'],
      seedTracking: false,
      synchronize: process.env.DB_SYNCRONIZE === 'true',
      logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource (dataSourceOptions);
export default dataSource;

dataSource.initialize().then(async() => {
    await dataSource.query("SET TIME ZONE 'Asia/Jakarta'");
    if(process.env.DB_SEEDER === 'true') {
        await dataSource.synchronize(true);
        await runSeeders(dataSource)
    }
    
}) 