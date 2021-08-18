const app = require('express').Router()
const crypto = require('crypto')
const mysqli = require('mysql').createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "#koldin13579",
    database: "tableEyes",
    port: 3306
})

app.post('/login', async (req, res) => {
    const { id, password } = req.body
    const query = "SELECT * FROM account WHERE name=?"
    try {
        const account = await getAccount(query, id) //get account
        if(account === undefined) return errorRes(res, "ID") //if id isnt match any row

        const matchPwd = checkPwd(account, password) //check matched inp password & account password, it return boolean
        if(matchPwd) {
            req.session.id = account.id //master key
            res.status(200).send(["200 Request succesed", {
                code: 200,
                comment: "login success"
            }])
        } else {
            errorRes(res, "PASSWORD")
        }
    } catch(err) {
        console.log(err)
        errorRes(res, "ID")
    }
})

function errorRes(res, errStr) {
    let code = 400
    let msg = "Bad Request"
    if(errStr == "ID") {
        code = 404
        msg = "Not Found User"
    }
    const mainMsg = `${code} ${msg}`
    res.status(400).send([mainMsg, {
        comment: `please check the '${errStr}'`,
        code: code,
        codeMsg: msg
    }])
}

function crypting(password, random) {
    const result = crypto.createHash('sha512').update(password + random).digest('base64')
    return result
}

function checkPwd(account, pwd) {
    console.log(account)
    console.log(crypting(pwd, account.random))
    if(account.password != crypting(pwd, account.random)) return false
    else return true
}

async function getAccount(query, id) {
    return new Promise((resolve, reject) => {
        mysqli.query(query, [id], (err, data) => {
            if(err) reject(err)
            else resolve(data[0])
        })
    })
} 

module.exports = app