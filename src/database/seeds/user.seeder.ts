import * as path from 'path';
import * as fs from 'fs';
import { Seeder } from 'typeorm-extension';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/auth/user/entities/user.entity';
import { parse } from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid'

export default class UserSeeder implements Seeder {
  private readonly logger = new Logger(UserSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    try {
      const userPath = path.join(process.cwd(), './src/database/csv/userseeder.csv');
      const userHeaders = ['id', 'nik', 'name', 'email', 'bagian', 'role'];
      const userCsv = fs.readFileSync(userPath, {encoding: 'utf-8'});
      const userRepository = dataSource.getRepository(User);

      this.logger.log('Starting user seeding...')

      const result = parse(userCsv, {
        delimiter: ';',
        columns: userHeaders,
        fromLine: 2,
        cast: (columnValue, context) => {
          if(context.column === 'id' && (!columnValue || columnValue.trim() === '')) {
            return uuidv4();
          }
          return columnValue;
        },
      });

      for (const userData of result) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
      }

      this.logger.log('User seeding completed successfully');

    } catch(error) {
      this.logger.error('Error during user seeding', error);
      throw error;
    }
  }
}