const app = require('express').Router()
const mysqli = require('./createConn')

app.delete('/store', async (req, res) => {
    const { id } = req.body
    const userId = req.session._id
    console.log(userId)
    
    if(userId === undefined) return res.status(403).send({
        errMsg: 'Forbidden'
    })
    try {
        await matchOwner(id, userId)
        await delStore(id)
        res.status(204).json({
            massage: "No Content"
        })
    } catch(err) {
        console.log(err)
        let errCode = 405
        if(err === "Unauthorized") 
            errCode = 402
        else if(err === "Not Found") 
            errCode = 404

        res.status(errCode).json({
            errMsg: err
        })
    }

})

async function matchOwner(id, userId) {
    return new Promise((resolve, reject) => {
        mysqli.query("SELECT ownerId FROM store WHERE id=?", [id], (err, owner) => {
            if(userId !== owner[0].ownerId) reject('Unauthorized')
            else if(owner.length < 1) reject("Not Found")
            else if(err) reject(err)
            else resolve(owner[0].ownerId)
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