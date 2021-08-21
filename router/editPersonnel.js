const app = require('express').Router()
const mysqli = require('./createConn')

app.patch('/store/personnel/:id', async (req, res) => {
    const { personnel } = req.body
    const id = req.params.id
    try {
        const data = await patchDB(parser.parse(personnel))
        res.status(200).send({
            id: id,
            personnel: personnel
        })
    } catch(err) {
        console.log(err)
        res.status(400).json({
            errMsg: "Bad Request"
        })
    }
})

async function patchDB(personnel, id) {
    return new Promise((resolve, reject) => {
        mysqli.query('UPDATE store SET nowPersonnel=? WHERE id=?', [personnel, id], (err, data) => {
            if(err) return reject (err)
            resolve(data)
        })
    })
}

module.exports = app