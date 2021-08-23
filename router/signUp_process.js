const app = require('express').Router()
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const mysqli = require('./createConn')

app.post('/sign-up', async (req, res) => {
    const { password, name, email, age, sex, phoneNumber, hometown } = req.body
    const checkKey = crypto.randomBytes(20).toString('base64')
    const random = crypto.randomBytes(10).toString('base64')
    const encryptedPwd = encrypter(password, random)

    let params = [name, encryptedPwd, email, random, age, sex, phoneNumber, hometown, checkKey]
    
    try {
        await overlapCheck(email, name, phoneNumber)
        const parsedParams = parsing(params)
        const accountId = await signUp(parsedParams)
        // await sendMail(email, checkKey)
        res.status(201).json({
            massage: "user ID was created",
            insertId: accountId.insertId
        })
    } catch(err) {
        console.log(err)
        res.status(400).json({
            errMsg: "Bad Request",
            error: err
        })
    }
})

function parsing(params) {
    let result = new Array()
    for (data of params) {
        if(typeof data === 'string') data.replace('script', 'div')
        result.push(data)
    }
    return result
}

async function overlapCheck(email, name, phoneNumber) {
    return new Promise((resolve, reject) => {
        mysqli.query("SELECT * FROM account", (err, data) => {
            if(err) reject(err)
            for(data of data) {
                if(
                    email == data.email ||
                    name == data.name ||
                    phoneNumber == data.phoneNumber
                ) reject("this account is already signed up")
            }
            resolve(true)
        })
    })
}

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

function encrypter (password, random) {
    const result = crypto.createHash('sha512').update(password + random).digest('base64')
    return result
}

async function signUp(params) {
    return new Promise((resolve, reject) => {
        mysqli.query("INSERT INTO account(name, password, email, random, age, sex, phoneNumber, hometown, checkKey) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", params, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = app