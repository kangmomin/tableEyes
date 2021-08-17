const app = require('express').Router()
const crypto = require('crypto-js')
const mysqli = require('mysql').createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "#koldin13579",
    database: "tableEyes",
    port: 3306
})

app.post('/login', async (req, res) => {
    const { id, password } = req.body
    const query = "SELECT id FROM account WHERE id="
    try {
        const account = await getAccount(query, id)
        if(checkPwd(account, password)) { //if matched inp password & account password
            req.session.id = account.id //master key
            res.status(200).send(["200 Request succesed", {
                code: 200,
                comment: "login success"
            }])
        } else {
            res.status(400).send(["400 Bad Request", {
                comment: "please recheck the 'PASSWORD'",
                code: 400,
                codeMsg: "bad request"
            }])
        }
    } catch(err) {
        console.log(err)
        return res.status(400).send(["400 Bad Request", {
            comment: "please recheck the 'ID'",
            code: 400,
            codeMsg: "bad request"
        }])
    }
})

function cryting(account, password) {
    return crypto.createHash('sha512').update((password + account.random)).digest('base64')
}

function checkPwd(account, pwd) {
    if(account.password != cryting(account, pwd)) return false
    else return true
}

async function getAccount(query, id) {
    return new Promise((resolve, reject) => {
        mysqli.query(query, id, (err, data) => {
            if(err) reject(err)
            else resolve(data)          
        })
    })
} 

module.exports = app