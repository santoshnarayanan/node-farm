const fs = require("fs");
//********!non - asynchronous way*********************
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if(err) return console.log('ERROR!!!!!');
    else console.log('NO ERRORS!!!!\n\n\n');
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile('./txt/append.txt', "utf-8", (err, data3) => {
        console.log(data3);

        fs.writeFile('./txt/finalout.txt',`${data2}\n${data3}`,'utf-8', err=>{
            console.log('file has been written');
        });
    });
  });
});
console.log("Reading data is completed");
