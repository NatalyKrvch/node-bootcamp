const EventEmitter = require('events')
const http = require('http')


class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales()

myEmitter.on('newSale', () => console.log('it is a new Sale'))

myEmitter.on('newSale', () => console.log('customer name: Jonas'))

myEmitter.on('newSale', (stock) => console.log('available: ', stock))

myEmitter.emit('newSale', 9)

///////////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
    console.log('request received')
    console.log(req.url)
    res.end('request received')
})

server.on('request', (req, res) => {
    console.log('another request received')
})

server.on('close', () => {
    console.log('server closed')
})

server.listen(8000, '127.0.0.1', (err) => {
    console.log('waiting for request')
})
