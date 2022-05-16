let dt = new Date();
console.log(`wake up at ${dt.toISOString()}`);

let doWork = function(job, timer){

    return new Promise((resolve, reject) => {
    setTimeout(() => {
        let dt = new Date();
        let result = `finish ${job} at ${dt.toISOString()}`;
        resolve(result);
    }, timer);
})
} 


async function main (){
    let doBrushPromise = await doWork(`brush teeth`, 3000);
    console.log(doBrushPromise);

    let doEatPromise = await doWork(`eat breakfast`, 5000);
    console.log(doEatPromise);

    let doHWPromise = await doWork(`do HW`, 3000);
    console.log(doHWPromise);
}

main();