const express = require('express')
const cors = require('cors')
const app = express()
const port = 4004
const bp = require('body-parser')

const storeRequest = require('./router/storeRequest')
const addStore = require('./router/addStore')
const editStore = require('./router/editStore')
const deleteStore = require('./router/deleteStore')
const editPersonnel = require('./router/editPersonnel')

app.set('views', __dirname + '/public')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)
app.use(bp.urlencoded({ extended: false }))
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('/index.html'))
app.get('/store/:type?/:id?', storeRequest)

app.put('/store/:id', editStore)

app.patch('/store/personnel/:id', editPersonnel)

app.delete('/store', deleteStore)

app.post('/store', addStore)

app.get('*', (req, res) => res.status(404).send("NOT FOUND PAGE"))

app.listen(port, () => console.log(`server is running on port ${port}`))