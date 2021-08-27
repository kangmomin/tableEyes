const express = require('express')
const cors = require('cors')
const app = express()
const port = 4004
const bp = require('body-parser')
const cp = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const storeRequest = require('./router/storeRequest')
const addStore = require('./router/addStore')
const editStore = require('./router/editStore')
const deleteStore = require('./router/deleteStore')
const editPersonnel = require('./router/editPersonnel')
const login_process = require('./router/login_process')
const singUp_process = require('./router/signUp_process')
const test = require('./router/test')
const testLogin = require('./router/testLogin')
const addReview = require('./router/addReview')

app.use(express.json())
app.set('views', __dirname + '/public')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)
app.use(bp.urlencoded({ limit: '1gb', extended: false }))
app.use(bp.json())
app.disable('etag')
app.use(cp())
app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
}))

app.use(session({
    key: "loginData",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:new FileStore(),
    cookie: { maxAge: 600000000, secure: false }
}))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('/index.html'))
app.get('/store/:type?/:id?', storeRequest)
app.get('/testLogin', testLogin)
app.get('/test', test)

app.put('/store/:id', editStore)

app.patch('/store/personnel/:id/:count', editPersonnel)

app.delete('/store/:id', deleteStore)

app.post('/store', addStore)
app.post('/login', login_process)
app.post('/sign-up', singUp_process)
app.post('/review/:storeId', addReview)

app.get('*', (req, res) => res.status(404).json({ massage:"Not Found Page" }))

app.listen(port, () => console.log(`server is running on port ${port}`))