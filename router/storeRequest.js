const app = require('express').Router()
const mysqli = require("mysql").createConnection({
    host: 'localhost',
    password: '#koldin13579',
    port: 3306,
    user: 'root',
    database: "tableeyes"
})

app.get('/store/:type?', async (req, res) => {
    const type = req.params.type || "default"
    const query = setQuery(type)
    const db = await getDB(query).catch(err => {
        console.log(err.code) //배포시 삭제
        if(err.code == `ER_BAD_FIELD_ERROR`) res.status(400).send({
            comment: "Bad Request",
            code: -400
        })
    })
    res.status(200).send(db)
})

async function getDB(query) {
    return new Promise((resolve, reject) => {
        mysqli.query(query, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

function setQuery(type) {
    const defaultQuery = `SELECT * FROM store`
    if(type == 'default') return defaultQuery
    let query =  `SELECT ${type} FROM store`
    return query
}

module.exports = app