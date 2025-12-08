const fs = require('fs')
const http = require('http')
const url = require('url')

//////////////////////////////////////////////////////////////////////
//FILES

//Sync, blocking

// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8')
// console.log(textIn)
//
// const textOut = `this is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/output.txt', textOut)
// console.log('Done')

//Async, non-blocking
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('error');
//
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//
//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}}`, 'utf-8', err => {
//                 console.log('written');
//             });
//         })
//     })
// })
//
// console.log('Done')


///////////////////////////////////////////////////////////////////////////////////
//SERVER

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf8')
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf8')
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf8')

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)

        res.end(output);

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello,world'
        });
        res.end('<h1>not found</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server started on port 8000')
})
