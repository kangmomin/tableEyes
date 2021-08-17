const app = require('express').Router()
const crypto = require('crypto-js')
const cryptoRandomString = require('crypto-random-string')
const nodemailer = require('nodemailer')
const mysqli = require('mysql').createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "#koldin13579",
    database: "tableEyes",
    port: 3306
})

app.post('/sign-up', async (req, res) => {
    const { id, password, name, email } = req.body
    let params = [id, encrypter(password), name, email]
    let checkKey = cryptoRandomString({length: 20, type: 'base64'})
    try {
        const accountId = await signUp(params)
        await sendMail(email, checkKey)
        res.status(201).send(["201 Created", {
            code: 201,
            comment: "user ID was created",
            id: accountId
        }])
    } catch(err) {
        res.status(400).send(["400 Bad Request", {
            code: 400,
            comment: "Bad Request",
            errMsg: err
        }])
    }
})

async function sendMail(email, checkKey) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'momin108902@gmail.com',  // gmail 계정 아이디를 입력
            pass: '#koldin13579'          // gmail 계정의 비밀번호를 입력
        }
    })

    let mailOptions = {
        from: 'momin108902@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email,                     // 수신 메일 주소
        subject: '[Table Eyes] 본인 인증 메일',   // 제목
        text: `thanks for use "Table Eyes"! \n click : ${checkKey}`  // 내용
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if(error) reject(error)
            else resolve('Email sent: ' + info.response)
        })
    })
}

function encrypter (password) {
    const random = cryptoRandomString({length: 10, type: 'base64'})
    const password = crypto.createHash('sha512').update(password + random).digest('base64')
    return password
}

async function signUp(params) {
    return new Promise((resolve, reject) => {
        mysqli.query("INSERT INTO store(id, password, name, email) VALUES (?, ?, ?, ?)", params, (err, data) => {
            if(err) reject(err)
            else resolve(data.InsertId)
        })
    })
}

module.exports = app