const app = require('express')()
const mysqli = require('./createConn')

app.post('/store', (req, res) => {
    const ownerId = req.session.userId

    if(ownerId == undefined) return res.status(401).json({
        errMsg: "need login",
        detail: {
            ownerId
        }
    })

    const {
        name, lat, lon, maxPersonnel, description, logo
    } = req.body
    const category = JSON.stringify(req.body["category[]"] || req.body.category)
    const detail = {
        maxPersonnel,
        lat,
        lon,
        star: 0,
        starCount: 0,
        logo,
        waitingState: 0,
    }

    const params = [name, ownerId, description, category, JSON.stringify(detail)]
    
    try {
        const parsedParams = parsing(params)
        const result = addStore(parsedParams)
        res.status(201).json({
            id: result.inserId,
            ownerId,
            name,
            description,
            category,
            detail: JSON.stringify(detail),
        })
    } catch(err) {
        console.log(err)
        return res.status(400).json({
            errMsg: err
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

async function addStore(params) {
    const queryString = `INSERT INTO store (name, ownerId, description, category, detail) VALUES (?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        mysqli.query(queryString, params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = app