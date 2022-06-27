const fs = require('fs');
//!non - asynchronous way
fs.readFile('./txt/start.txt','utf-8',(err,data) =>{
    console.log(data);
});
console.log('Reading data is completed');