const mysqli = require('./createConn')
const app = require('express').Router()

app.get('/review/:storeId', async (req, res) => {
    const storeId = req.params.storeId
    
    try {
        const data = await getReview(storeId)
        res.status(200).json({
            message: "success",
            data
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

module.exports = app