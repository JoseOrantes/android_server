require('dotenv').config();
const { Sequelize } = require('sequelize');

async function main() {
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mariadb',
    logging: false,
  });

  try {
    const qi = sequelize.getQueryInterface();
    const users = await qi.describeTable('users');
    let profiles = null;
    try {
      profiles = await qi.describeTable('profiles');
    } catch (err) {
      profiles = { error: err.message };
    }

    console.log(JSON.stringify({ users, profiles }, null, 2));
  } finally {
    await sequelize.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
