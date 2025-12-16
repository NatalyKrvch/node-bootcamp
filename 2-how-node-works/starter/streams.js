const fs = require('fs')
const server = require('http').createServer()

server.on('request', (err, res) => {
    // Solution 1
    // fs.readFile('starter/test-file.txt', (err, data) => {
    //     if (err) console.log(err)
    //     res.end(data)
    // })

    // Solution 2: streams
    // const readable = fs.createReadStream(__dirname + '/test-file.txt')
    // readable.on('data', (chunk) => {
    //     res.write(chunk)
    // })
    // readable.on('end', () => {
    //     res.end()
    // })
    // readable.on('error', (err) => {
    //     console.error(err)
    //     res.statusCode = 500
    //     res.end('file not found')
    // })

    // Solution 3
    const readable = fs.createReadStream(__dirname + '/test-file.txt')
    readable.pipe(res)
})

server.listen(8000, '127.0.0.1', (err) => {
    console.log('server listening on 8000')
})
