const app = require('express').Router()
const mysqli = require('mysql').createConnection({
    host : '127.0.0.1',
    user: 'root',
    password: "#koldin13579",
    database: "tableEyes",
    port: 3306
})

app.delete('/store', async (req, res) => {
    const { id } = req.body
    await delStore(id).catch(err => {
        console.log(err)
        res.send(['405 Method Not Allowd', {
            code : 405,
            comment: "Method Not Allowed"
        }])
    })

    res.status(204).send(["204 No Content", {
        code: 204,
        comment: "No Content"
    }])
})

async function delStore(id) {
    return new Promise ((resolve, reject) => {
        mysqli.query(`DELETE FROM store WHERE id=?`, [id], (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
}

module.exports = app