const fs = require('fs')
const superagent = require('superagent')

const readFileProm = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('could not read file')
            resolve(data)
        })
    })
}

const writeFileProm = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('could not write file')
            resolve('success')
        })
    })
}

readFileProm(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`)
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
    .then(res => {
        console.log(res.body.message)
        return writeFileProm(`${__dirname}/dog-img.txt`, res.body.message)
    })
    .then(() => {
        console.log('random dog image has saved to the file')
    })
    .catch(err => {
        console.log(err)
    })
