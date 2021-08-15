const app = require('express').Router()
const mysqli = require('mysql').createConnection({
    host : "127.0.0.1",
    user: "root",
    password: "#koldin13579",
    database: "tableEyes",
    port: 3306
})

app.patch('/store/personnel/:id', async (req, res) => {
    const { personnel } = req.body
    const id = req.params.id
    try {
        const data = await patchDB(personnel)
        console.log(data)
        res.status(200).send(["200 successed", {
            code : 200,
            comment: "200 successed",
            detail: {
                id: id,
                personnel: personnel
            }
        }])
    } catch(err) {
        console.log(err)
        res.status(400).send(["Bad Request", {
            code : 400,
            comment: "Bad Request"
        }])
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