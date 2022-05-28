const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());

require('dotenv').config();

let pool = mysql.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DB,
    connectionLimit:10,

}).promise();

//5/21ㄉ部分 製作可切換ㄉ網址
app.get('/', (request, response, next) => {
    response.send("Home");
});

app.get('/about', (request, response, next) => {
    response.send("About me");
})

app.listen(3001, () => {
    console.log('start server at port 3000');
})

//RESTful API
//取得stock列表
app.get('/stocks', async (req, res, next) => {
    let [data, fields] = await pool.execute('SELECT * FROM stocks');
    res.json(data);
  });
  
  // 取得某個股票 id 的資料
  app.get('/stocks/:stockId', async (req, res, next) => {
    // 取得網址上的參數 req.params
    // req.params.stockId
    console.log('get stocks by id', req.params);
    let [data, fields] = await pool.execute('SELECT * FROM stocks WHERE id = ' + req.params.stockId);
  
    console.log('query stock by id:', data);
    // 空資料(查不到資料)有兩種處理方式：
    // 1. 200OK 就回 []
    // 2. 回覆 404
    if (data.length === 0) {
      // 這裡是 404 範例
      res.status(404).json(data);
    } else {
      res.json(data);
    }
  });
  
  // 這個中間件在所有路由的後面
  // 會到這裡，表示前面所有的路由中間件都沒有比到符合的網址
  // => 404
  app.use((req, res, next) => {
    console.log('所有路由的後面 ==> 404', req.path);
    res.status(404).send('Not Found');
  });