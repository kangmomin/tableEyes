const app = require('express')()
const mysqli = require('./createConn')

app.post('/store', (req, res) => {
    const ownerId = req.session.userId

    if(ownerId == undefined) return res.status(401).json({
        errMsg: "need login",
        mainDetail: {
            ownerId
        }
    })

    const {
        name, lat, lon, maxPersonnel, description, logo, number, openTime, closeTime, holiday, infoDescription,        
    } = req.body
    const mainCategory = req.body.mainCategory
    const mainDetail = JSON.stringify({
        maxPersonnel,
        lat,
        lon,
        star: 0,
        starCount: 0,
        logo,
        waitingState: 0,
    })

    const conFacility = req.body.conFacility
    const seat = req.body.seat //FE에서 dafult값을 정의 해서 보내줘야함
    //[{lat, lon, isClear: bool, imgType: sit, type}]
    const eachDetail = JSON.stringify({
        number,
        openTime,
        closeTime,
        holiday,
        infoDescription,
        conFacility
    })

    const mainParams = [ownerId, name, description, mainCategory, mainDetail]
    const eachParams = [conFacility, seat, eachDetail]
    
    try {
        const parsedMainParams = parsing(mainParams)
        const parsedEachParams = parsing(eachParams)
        const result = addStore(parsedMainParams, parsedEachParams)
        res.status(201).json({
            id: result,
            ownerId,
            name,
            description,
            mainCategory,
            mainDetail,
        })
    } catch(err) {
        console.log(err)
        return res.status(400).json({
            errMsg: err
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

async function addStore(mainParams, eachParams) {
    try {
        const insertId = await addMainStore(mainParams)
        await addEachStore(eachParams, insertId)
    } catch (err) {
        console.log(err)
        return new Error(err)
    }
}

async function addMainStore(params) {
    const queryString = `INSERT INTO store (ownerId, name, description, category, detail) VALUES (?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        mysqli.query(queryString, params, (err, data) => {
            if (err) reject(err)
            else resolve(data.insertId)
        })
    })
}

async function addEachStore(params, insertId) {
    params.unshift(insertId)
    const queryString = `INSERT INTO eachStore (refStore, conFacility, seat, eachDetail) VALUES (?, ?, ?, ?)`
    return new Promise((reject, resolve) => {
        mysqli.query(queryString, params, (err, data) => {
            console.log(err)
            console.log(data)
            if (err) reject(err)
            else resolve(data)
        })
    })
}

module.exports = app