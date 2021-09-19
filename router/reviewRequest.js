const mysqli = require('./createConn')
const app = require('express').Router()

app.get('/review/:storeId', async (req, res) => {
    const storeId = req.params.storeId
    const type = req.params.type
    
    try {
        const reviewData = await getReview(storeId)

        for (data of reviewData) {
            const ownerData = await getOwner(data.ownerData)
            data.ownerDetail = ownerData
        }
        
        res.status(200).json({
            message: "success",
            reviewData
        })
    } catch(err) {
        let errCode = 400
        let errMsg = "Bad Request"

        if(err === 404) {
            errCode = 404
            errMsg = "Not Found"
        }

        res.status(errCode).json({
            message: errMsg
        })
    }
})

async function getReview(storeId) {
    return new Promise((resolve, reject) => {
        mysqli.query("SELECT * FROM review WHERE storeId=?", [storeId], (err, data) => {
            if(err) reject(err)
            else if(data.length < 0) reject(404)
            else resolve(data)
        })
    })
}

async function getOwner(ownerId) {
    return new Promise((resolve, reject) => {
        mysqli.query(`SELECT name, email, age, sex FROM account WHERE id=?` [ownerId], (err, data) => {
            if(err) reject(err)
            else if(data.length < 0) reject(404)
            else resolve(data)
        })
    })
}

module.exports = app