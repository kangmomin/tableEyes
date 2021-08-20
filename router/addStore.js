const app = require('express')()
const mysqli = require('mysql').createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "#koldin13579",
    database: "tableeyes",
    port: 3306
})

app.post('/store', (req, res) => {
    const {
        name, lat, lon, maxPersonnel, description, logo
    } = req.body
    const category = JSON.stringify(req.body["category[]"])
    const params = [name, lat, lon, maxPersonnel, description, category, logo]
    try {
        const parsedParams = parsing(params)
        const result = addStore(parsedParams)
        res.status(201).send(["koldin.myddns.me:4004 201 Created", {
            id: result.inserId,
            name: name,
            description: description,
            maxPersonnel: maxPersonnel,
            logo: logo,
            lat: lat,
            lon: lon,
            category: category
        }])
    } catch(err) {
        console.log(err)
        return res.status(400).send({
            code: 400,
            massage: err
        })
    }
})

function parsing(params) {
    let result = new Array()
    for (data of params) {
        result.push(data.replace(/script+/g, 'div'))
    }
    return result
}

async function addStore(params) {
    const queryString = `INSERT INTO store (name, lat, lon, maxPersonnel, description, category, logo) VALUES (?, ?, ?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        mysqli.query(queryString, params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = app