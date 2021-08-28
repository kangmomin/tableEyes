const app = require('express').Router()

app.get('/sort/:mode', (req, res) => {
    const mode = req.params.mode
    const data = req.body.data
    if(
        mode !== "name" ||
        mode !== "star" ||
        mode !== "location" ||
        mode !== "personnel"
    ) return res.status(405).json({
        message: "Method Not Allowed",
        detail: {
            Methods: ["name", "star", "location", "personnel"]
        }
    })
    const result = data.sort((a, b) => {
        if(mode === "star") return b[mode] - a[mode]
        else if(mode === "name") {
            if (a[mode] > b[mode]) return 1
            else if (a[mode] < b[mode]) return -1
        } else
            return a[mode] - b[mode]
    })

    res.status(200).json(result)
})

module.exports = app