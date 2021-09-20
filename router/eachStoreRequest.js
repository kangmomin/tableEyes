const app = require('express').Router()
const mysqli = require('./createConn')

app.get("/each-store/:id", async (req, res) => {
    const id = req.params.id
    
    try {
        const qs = queryString()
        const data = await getData(qs, id)

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Bad Request"
        })
    }
})

async function getData(qs, id) {
    return new Promise((resolve, reject) => {
        mysqli.query(qs, [id], (err, data) => {
            if (err) reject(err)
            else if (data.length < 1) reject(404)
            else resolve(data)
        })
    })
}

function queryString() {
    let query = "SELECT * FROM eachStore WHERE refStore=?"
    return query
}

module.exports = app