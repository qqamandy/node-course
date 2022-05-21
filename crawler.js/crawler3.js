// await version
// 1. read stock no from file (fs)
// 2. axios.get to request data

const axios = require('axios');
const fs = require('fs');

let read = new Promise((resolve, reject) => {
    fs.readFile('./stock.txt', 'utf-8', (err, stockNo) => {
        if(err){
            reject(err);
        }else{
            resolve(stockNo);
        }
    })
})
let res ;
async function main(){
    let num = await read;
    axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
            params: {
              // 設定 query string
              response: 'json',
              date: '20220301',
              stockNo: num,
            },
          }).then((response) => {
                  // response 物件
                  console.log(response.data);
                })
                .catch((e) => {
                  console.error(e);
                });
}


main();
