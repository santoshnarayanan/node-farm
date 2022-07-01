const { count } = require("console");
const fs = require("fs");
const http = require('http');

//**************************SERVER************************************* */
 const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName );
    output = output.replace(/{%IMAGE%}/g, product.image );
    output = output.replace(/{%PRICE%}/g, product.price );
    output = output.replace(/{%FROM%}/g, product.from );
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients );
    output = output.replace(/{%QUANTITY%}/g, product.quantity );
    output = output.replace(/{%DESCRIPTION%}/g, product.description );
    output = output.replace(/{%ID%}/g, product.id );
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic' );
    return output;
 }

 //file read in synchronous way 
 const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
 const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
 const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
 const dataObj = JSON.parse(data);

//****************************create server*************  */
const server = http.createServer((req,res)=> {
  const pathName = req.url;

  //Overview Page
  if(pathName === '/overview' || pathName === '/'){
    res.writeHead(200,{'Content-type': 'text/html' });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    
    //sending response
    res.end(output);

    //Product Page
  }else if(pathName === '/product'){
    res.end('This is the product');

    //API
  }else if(pathName === '/api'){
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
