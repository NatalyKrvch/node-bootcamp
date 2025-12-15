const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 3

setTimeout(() => console.log('timer 1 finished'), 0)
setImmediate(() => console.log('immediate 1 finished'))

fs.readFile('test-file.txt', 'utf8', (err, data) => {
    console.log('i/o finished')
    console.log('-----------------------')

    setTimeout(() => console.log('timer 2 finished'), 0)
    setTimeout(() => console.log('timer 3 finished'), 3000)
    setImmediate(() => console.log('immediate 2 finished'))

    process.nextTick(() => console.log('process.nextTick'))

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', (err, result) => {
        console.log(Date.now() - start, 'password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', (err, result) => {
        console.log(Date.now() - start, 'password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', (err, result) => {
        console.log(Date.now() - start, 'password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', (err, result) => {
        console.log(Date.now() - start, 'password encrypted')
    })
})

console.log('top-level code')
