const express = require('express')
const app = express()
const port = 4004

const storeRequest = require('./router/storeRequest')

app.get('/store/:type?', storeRequest)

app.get('*', (req, res) => res.status(404).send("NOT FOUND PAGE"))

app.listen(port, () => console.log(`server is running on port ${port}`))