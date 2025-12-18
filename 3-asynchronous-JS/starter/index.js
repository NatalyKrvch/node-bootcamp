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

const getDogPic = async () => {
    try {
        const data = await readFileProm(`${__dirname}/dog.txt`)
        console.log(`Breed: ${data}`)

        const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)

        const all = await Promise.all([res1Pro, res2Pro, res3Pro])
        const img = all.map(el => el.body.message)

        console.log(img)

        await writeFileProm(`${__dirname}/dog-img.txt`, img.join('\n'))
        console.log('random dog image has saved to the file')
    } catch (err) {
        console.log(err)
        throw(err)
    }
    return '2: ready'
}

(async () => {
    try {
        console.log('1: will get the dog picture')
        const x = await getDogPic()
        console.log(x)
        console.log('3: done')
    } catch (err) {
        console.log('ERROR')
    }
})()

// console.log('1: will get the dog picture')
//
// getDogPic().then(x => {
// console.log(x)
// console.log('3: done')
// }).catch(err => console.log('ERROR'))

// readFileProm(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`)
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then(res => {
//         console.log(res.body.message)
//         return writeFileProm(`${__dirname}/dog-img.txt`, res.body.message)
//     })
//     .then(() => {
//         console.log('random dog image has saved to the file')
//     })
//     .catch(err => {
//         console.log(err)
//     })
