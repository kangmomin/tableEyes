const app = require('express').Router()
const mysqli = require('mysql').createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "tableEyes",
    password: "#koldin13579",
    port: 3306
})

app.put('/store/:id', async (req, res) => {
    const id = req.params.id
    const {
        name, lat, lon, maxPersonnel, description, logo
    } = req.body
    const category = JSON.stringify(req.body["category[]"])
    const params = [name, lat, lon, maxPersonnel, description, category, logo]
    console.log(req.body)
    const data = updateStore(id, params).catch(err => {
        console.log(err)
        return res.status(405).send(["405 Method Not Allowed", {
            code : 405,
            comment: "Method Not Allowed"
        }])
    })
    res.status(200).send(["200 Done", { code : 200, data }])
})

async function updateStore(id, params) {
    return new Promise((resolve, reject) => {
        params.push(id)
        const queryString = 
            `UPDATE store SET name=?, lat=?, lon=?, maxPersonnel=?, description=?, category=?, logo=? WHERE id=?`
        mysqli.query(queryString, params, (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = app