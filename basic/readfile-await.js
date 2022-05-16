const fs = require('fs');


// fs.readFile('test.txt', 'utf-8', (err, data)=>{
//     if (err){
//         console.log('錯ㄌ');
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })



let p = new Promise((resolve, reject)=>{
    fs.readFile('test.txt', 'utf-8', (err, data)=>{
            if (err){
                return reject(err);              
            }else{
               return resolve(data);
            }
        })
})

//then的寫法
// p.then((data)=>{
// console.log(`resolved : ${data}`);
// }).catch((err)=>{
//     console.log(err);
// });

async function main (){
    try {
        console.log(resolve(data));
    } catch (error) {
        console.log(reject(err));
    }
}
