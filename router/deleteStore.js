const app = require('express').Router()
const mysqli = require('./createConn')

app.delete('/store', async (req, res) => {
    const { id } = req.body
    const userId = req.session.id

    try {
        await matchOwner(id, userId)
        await delStore(id)
        res.status(204).json({
            massage: "No Content"
        })
    } catch(err) {
        console.log(err)
        res.status(405).json({
            errMsg: "Method Not Allowed"
        })
    }

})

async function matchOwner(id, userId) {
    return new Promise((resolve, reject) => {
        mysqli.query("SELECT ownerId FROM store WHERE id=?", [id], (err, owner) => {
            if(owner !== userId) reject("unmatch")
            if(err) reject(err)
            resolve("match")
        })
    })
}

async function delStore(id) {
    return new Promise ((resolve, reject) => {
        mysqli.query(`DELETE FROM store WHERE id=?`, [id], (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = app