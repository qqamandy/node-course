let dt = new Date();
console.log(`起床ㄌ at ${dt.toISOString}`);

let doWork = function(job, timer){
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            let dt = new Date();
            let result = `完成工作 ${job} at ${dt.toISOString()}`;
            resolve(result);
        }, timer);
    })
    
}

let doBrushPromise = doWork('刷牙', 3000);
doBrushPromise.then((result)=>{
    console.log(result)
})

