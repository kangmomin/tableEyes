const app = require('express').Router()

app.post('/sort/:mode', (req, res) => {
    const mode = req.params.mode
    const decodedUrl = decodeURIComponent(req.query)
    const data = JSON.parse(decodedUrl)

    console.log(data)

    if(
        mode !== "name" &&
        mode !== "star" &&
        mode !== "location" &&
        mode !== "nowPersonnel"
    ) return res.status(405).json({
        message: "Method Not Allowed",
        detail: {
            Methods: ["name", "star", "location", "nowPersonnel"]
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