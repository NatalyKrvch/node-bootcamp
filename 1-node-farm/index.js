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


const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    console.log(`Server running at ${(req.url)}`)
    const pathName = req.url

    if (pathName === '/' || pathName === '/about') {
        res.end('this is /about!');
    } else if (pathName === '/projects') {
        res.end('this is /projects!');
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
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
