const fs = require("fs");
const http = require('http');

 //file read in synchronous way 
 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
 const productData = JSON.parse(data);

//#region create server
const server = http.createServer((req,res)=> {
  console.log(req.url);

  const pathName = req.url;
  if(pathName === '/overview' || pathName === '/'){
    res.end('This is the overview or at root');
  }else if(pathName === '/product'){
    res.end('This is the product');
  }else if(pathName === '/api'){

    //#region below code is commented for asynchronous way
    // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
    //   const productData = JSON.parse(data);
    //   console.log(productData);
    //   res.writeHead(200,{'Content-type': 'application/json' });
    //   res.end(data);
    //#endregion

    res.writeHead(200,{'Content-type': 'application/json' });
    res.end(data);
    // });
  }else {
    res.writeHead(404,{
      'Content-type':'text/html'
    });
    res.end('<h1>Page not found</h1>');
  }
});
//#endregion


//#region listening server
server.listen(8000,'127.0.0.1',()=>{
  console.log('Listening to requests on port 8000');
});
//#endregion
