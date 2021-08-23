const app = require('express').Router()
const mysqli = require('./createConn')
//유저 인증 추가
app.put('/store/:id', async (req, res) => {
    const id = req.params.id
    const {
        name, lat, lon, maxPersonnel, description, logo
    } = req.body
    const category = JSON.stringify(req.body["category[]"])
    const params = [name, lat, lon, maxPersonnel, description, category, logo]
    const parsedParams = parsing(params)
    try {
        const data = updateStore(id, parsedParams)
        res.status(200).json({ data })
    } catch (err) {
        console.log(err)
        res.status(405).json({
            errMsg: "Method Not Allowed"
        })
    }
})

function parsing(params) {
    let result = new Array()
    for (data of params) {
        if(typeof data === 'string') data.replace('script', 'div')
        result.push(data)
    }
    return result
}

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