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
                console.log('錯ㄌ');
                console.log(err);
            }else{
                console.log(data);
            }
        })
})

p.then((data)=>{
console.log(data)
}).catch((err)=>{
    console.log(err)
});