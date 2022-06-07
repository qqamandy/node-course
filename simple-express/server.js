const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());

require("dotenv").config();

let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    connectionLimit: 10,
  })
  .promise();

//5/21ㄉ部分 製作可切換ㄉ網址
app.get("/", (request, response, next) => {
  response.send("Home");
});

app.get("/about", (request, response, next) => {
  response.send("About me");
});

//RESTful API
//取得stock列表
app.get("/stocks", async (req, res, next) => {
  let [data, fields] = await pool.execute("SELECT * FROM stocks");
  res.json(data);
});

// 取得某個股票 id 的資料
app.get("/stocks/:stockId", async (req, res, next) => {
  // 取得網址上的參數 req.params
  // req.params.stockId
  console.log("get stocks by id", req.params);
  // let [data, fields] = await pool.execute(
  //   "SELECT * FROM stock_prices WHERE stock_id = ?",
  //   [req.params.stockId]
  // );
  // console.log("query stock by id", data);

  //1. 取得目前在第幾頁
  let page = req.query.page || 1;
  console.log("current page = ", page);

  //2. 取得目前總筆數
  let [allResults, fields] = await pool.execute(
    "SELECT * FROM stock_prices WHERE stock_id = ?",
    [req.params.stockId]
  );
  const total = allResults.length;
  console.log("total = ", total);

  //3. 計算總共有幾筆
  const perPage = 5; //每頁有幾筆
  const lastPage = Math.ceil(total / perPage);
  console.log("last page = ", lastPage);

  //計算offset要跳過幾筆
  let offset = (page - 1) * perPage;
  console.log("offset = ", offset);

  //
  let [pageResults] = await pool.execute(
    "SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date DESC LIMIT ? OFFSET ?",
    [req.params.stockId, perPage, offset]
  );

  res.json({
    //儲存頁碼ㄉ位置
    pagination: {
      total,
      lastPage,
      page,
      //其實應該要寫成
      // total: total,
      // lastPage: lastPage,
      // page: page
    },
    //真正ㄉdata
    data: pageResults,
  });
});

// 這個中間件在所有路由的後面
// 會到這裡，表示前面所有的路由中間件都沒有比到符合的網址
// => 404
app.use((req, res, next) => {
  console.log("所有路由的後面 ==> 404", req.path);
  res.status(404).send("Not Found");
});

app.listen(3001, () => {
  console.log("start server at port 3001");
});
