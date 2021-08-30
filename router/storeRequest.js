const app = require('express').Router()
const mysqli = require('./createConn')

app.get('/store/:type?/:id?', async (req, res) => {
    const type = req.params.type || "All"
    const id = req.params.id || null
    const query = setQuery(type, id)
    try {
        const db = await getDB(query)
        res.status(200).json(db)
    } catch(err) {
        console.log(err.code) //배포시 삭제
        if(err.code == `ER_BAD_FIELD_ERROR`) res.status(400).json({
            errMsg: "Bad Request"
        })
    }
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