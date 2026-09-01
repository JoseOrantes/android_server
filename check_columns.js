const { sequelize } = require('./dist/infrastructure/database/sequelize');
(async ()=>{
  try{
    await sequelize.authenticate();
    const [results] = await sequelize.query("SHOW COLUMNS FROM users");
    for (const row of results) {
      console.log(row.Field, row.Type, row.Null, row.Key, row.Default);
    }
    process.exit(0);
  }catch(e){
    console.error('ERR', e && e.message ? e.message : e);
    process.exit(1);
  }
})();
