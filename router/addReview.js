const app = require('express').Router()
const mysqli = require('./createConn')

app.post('/review/:storeId', async (req, res) => {
    const userId = req.session._id || 35
    const storeId = req.params
    const { description, starCount } = req.body
    const params = [storeId, userId, description, starCount]

    if(userId == undefined) errSend(res, "Forbidden", 403)
    
    try {
        let { nowStar, nowStarCount } = await getStar(storeId)
        const review = await addReview(params)
        nowStar++
        nowStarCount += starCount
        await setStoreStar(nowStar, nowStarCount / star)
        res.status(200).json({
            message: "create success",
            detail: {
                id: review[0].insertId,
                star: nowStar,
                starCount: nowStarCount,
                storeId,
                userId,
                description
            }
        })
    } catch(err) {
        let errCode = 400
        let errMsg = "Bad Request"
        if(err === 404) {
            errCode = err
            errMsg = "Not Found Store Star"
        }
        errSend(res, errMsg, errcode)
    }
})

function errSend(res, errMsg, errCode) {
    res.status(errCode).json({
        message: errMsg
    })
}

async function getStar(storeId) {
    return new Promise((resolve, reject) => {
        mysqli.query("SELECT (star, starCount) FROM store WHERE id=?", [storeId], (err, data) => {
            if(err) reject(err)
            else if(data === []) reject(404)
            else if(data) resolve({
                star: star * starCount,
                starCount
            })
        })
    })
}

async function addReview(params) {
    return new Promise((resolve, reject) => {
        mysqli.query("INSERT INTO store(storeId, userId, description, starCount) VALUES (?, ?, ?, ?)", params, (err, data) => {
            if(err) reject(err)
            else resolve(data[0].insertId)
        })
    })
}

async function setStoreStar(star, starCount) {
    return new Promise((resolve, reject) => {
        mysqli.query("UPDATE store (star, starCount) VALUES (?, ?)", [star, starCount], (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = app