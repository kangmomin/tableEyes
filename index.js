const express = require('express')
const cors = require('cors')
const app = express()
const port = 4004
const bp = require('body-parser')
const cp = require('cookie-parser')
const session = require("express-session")
const MySQLStore = require('express-mysql-session')

const storeRequest = require('./router/storeRequest')
const addStore = require('./router/addStore')
const editStore = require('./router/editStore')
const deleteStore = require('./router/deleteStore')
const editPersonnel = require('./router/editPersonnel')
const login_process = require('./router/login_process')
const singUp_process = require('./router/signUp_process')
const test = require('./router/test')

const sessionStore = new MySQLStore({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    database: 'tableEyes',
    password: "#koldin13579"
})

app.use(
    session({
        key: "login",
        secret: "session_cookie_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
)

app.set('views', __dirname + '/public')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)
app.use(bp.urlencoded({ limit: '1gb', extended: false }))
app.use(bp.json())
app.use(cp())
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('/index.html'))
app.get('/store/:type?/:id?', storeRequest)
app.get('/test', test)

app.put('/store/:id', editStore)

app.patch('/store/personnel/:id', editPersonnel)

app.delete('/store', deleteStore)

app.post('/store', addStore)
app.post('/login', login_process)
app.post('/sign-up', singUp_process)

app.get('*', (req, res) => res.status(404).json({ massage:"Not Found Page" }))

app.listen(port, () => console.log(`server is running on port ${port}`))