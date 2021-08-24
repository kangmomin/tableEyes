const app = require('express').Router()
const crypto = require('crypto')
const mysqli = require('./createConn')

app.post('/login', async (req, res) => {
    const { id, password } = req.body
    const query = "SELECT * FROM account WHERE name=?"
    try {
        const account = await getAccount(query, id) //get account
        if(account === undefined) return errorRes(res, "ID") //if id isnt match any row

        const matchPwd = checkPwd(account, password) //check matched inp password & account password, it return boolean
        if(matchPwd) {
            req.session.userId = account.id //master key
            req.session.save()
            res.status(200).json({
                massage: "login success",
                userId: account.id,
                detail: account
            })
        } else {
            errorRes(res, "PASSWORD")
        }
    } catch(err) {
        console.log(err)
        errorRes(res, "ID")
    }
})

function errorRes(res, errStr) {
    let msg = "Bad Request"
    if(errStr == "ID") {
        msg = "Not Found User"
    }
    res.status(400).json({
        errMsg: `${msg} | please check the '${errStr}'`
    })
}

function crypting(password, random) {
    const result = crypto.createHash('sha512').update(password + random).digest('base64')
    return result
}

function checkPwd(account, pwd) {
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