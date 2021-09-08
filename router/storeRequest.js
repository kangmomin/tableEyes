const app = require('express').Router()
const mysqli = require('./createConn')

app.get('/store/type/:type?/id/:id?/category/:category?', async (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const category = req.params.category
    const query = setQuery(type, id, category)
    console.log(query)
    try {
        let db = await getDB(query)
        if(category && !type) db = fillterCategory(category, db) //카테고리 필터
        res.status(200).json(db)
    } catch(err) {
        console.log(err.code) //배포시 삭제
        console.log(err.sqlMessage) //배포시 삭제

        if(err.code == `ER_BAD_FIELD_ERROR`) return res.status(400).json({
            errMsg: "Bad Request"
        })

        if(err.code == `ER_PARSE_ERROR`) return res.status(400).json({
            errMsg: "Bad Request",
            message: "sql string error"
        })
    }
})

function fillterCategory(category, db) {
    let result = new Array()
    for (db of db) {
        if(db.category.includes(category)) result.push(db)
    }

    return result
}

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
    if(!type && !id) return query =  `SELECT * FROM store`
    if(type) return query =  `SELECT ${type} FROM store`
    if(id) query += ` WHERE id=${id}`
    return query
}

module.exports = app