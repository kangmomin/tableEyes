const mysqli = require('mysql').createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "#koldin13579",
    database: "tableEyes",
    port: 3306
})

module.exports = mysqli