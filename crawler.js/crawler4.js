

const mysql = require('mysql2/promise');
//把.env裡的變數值讀進來
require('dotenv').config();

(async () => {
  //測試資料是否有連上
  console.log('DB_HOST', process.env.DB_HOST);
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
  });

  let [data, fields] = await connection.execute('SELECT * FROM stocks');
  console.log(data);

  // results [
  //     [],
  //     []
  // ]
  //let data = results[0];
  //let fields = results[1];

  connection.end();
})();