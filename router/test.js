const app = require('express').Router()
const axios = require('axios')

app.get('/test', (req, res) => {
    axios.post(
        "http://koldin.myddns.me:4004/sign-up",
        {
            name: "heoshin_test1",
            password: "1234",
            email: "ghtls050@gmail.com",
            age: 12,
            sex: "male",
            phoneNumber: "01027729778",
            hometown: "부산광역시 해운대구 좌동 대림1차",
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        console.log(res)
    })
    // const params = new URLSearchParams()
    // params.append('name', 'heoshin_test1')
    // params.append('password', '1234')
    // params.append('email', 'ghtls050@gmail.com')
    // params.append('age', 12)
    // params.append('sex', 'male')
    // params.append('phoneNumber', '01027729778')
    // params.append('hometown', '부산광역시 해운대구 좌동 대림1차')
    
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // }

    // axios.post('http://koldin.myddns.me:4004/sign-up', params, config).then((result) => {
    //     // console.log(result)
    //     console.log('done')
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
})

module.exports = app