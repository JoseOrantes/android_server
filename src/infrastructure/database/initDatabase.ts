import { sequelize } from './sequelize';

export async function initDatabase(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('Database connected and synced.');
}

export default initDatabase;
