const app = require('express').Router()
const mysqli = require("mysql").createConnection({
    host: 'localhost',
    password: '#koldin13579',
    port: 3306,
    user: 'root',
    database: "tableeyes"
})

app.get('/store/:type?/:id?', async (req, res) => {
    const type = req.params.type || "All"
    const id = req.params.id || null
    const query = setQuery(type, id)
    console.log(query)
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

function setQuery(type, id) {
    let query = `SELECT * FROM store`
    if(id !== null && id !== undefined) query += ` WHERE id=${id}`
    if(type == 'All') return query
    query =  `SELECT ${type} FROM store`
    return query
}

module.exports = app