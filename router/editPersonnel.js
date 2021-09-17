const app = require('express').Router()
const mysqli = require('./createConn')

app.patch('/store/personnel/:id/:count', async (req, res) => {
    const personnel = req.params.count
    const id = req.params.id
    const userId = req.session._id
    try {
        await matchOwner(userId, id)
        await patchDB(personnel, id)
        res.status(200).send({
            id: id,
            personnel: personnel
        })
    } catch(err) {
        console.log(err)
        let errCode = 400
        let errMsg = "Bad Request"
        if(err == "forbidden") {
            errMsg = "forbidden"
            errCode = 403
        }
        res.status(errCode).json({
            errMsg
        })
    }
})

async function matchOwner(userId, id) {
    return new Promise((resolve, reject) => {
        mysqli.query("SELECT ownerId FROM store WHERE id=?", [id], (err, data) => {
            if(err) reject(err)
            else if(userId !== data[0].ownerId) reject('forbidden')
            else resolve(data)
        })
    })
}

async function patchDB(personnel, id) {
    return new Promise((resolve, reject) => {
        mysqli.query('UPDATE store SET nowPersonnel=? WHERE id=?', [personnel, id], (err, data) => {
            if(err) return reject (err)
            resolve(data)
        })
    })
}

module.exports = app