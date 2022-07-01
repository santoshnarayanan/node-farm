const { count } = require("console");
const fs = require("fs");
const http = require('http');
const url= require('url');
const replaceTemplate = require('./modules/replaceTemplate');

//! SERVER side code 
 

 //file read in synchronous way 
 const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
 const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
 const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
 const dataObj = JSON.parse(data);


const server = http.createServer((req,res)=> {
  const {query, pathname} = url.parse(req.url, true);

  //Overview
  if(pathname === '/overview' || pathname === '/'){
    res.writeHead(200,{'Content-type': 'text/html' });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    res.end(output); // sending response

    //Product
  }else if(pathname === '/product'){
    res.writeHead(200,{'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output =  replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  }else if(pathname === '/api'){
    res.writeHead(200,{'Content-type': 'application/json' });
    res.end(data);
   }else {
    res.writeHead(404,{
      'Content-type':'text/html'
    });
    res.end('<h1>Page not found</h1>');
  }
});



//#region listening server
server.listen(8000,'127.0.0.1',()=>{
  console.log('Listening to requests on port 8000');
});
//#endregion
