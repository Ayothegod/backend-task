const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3001

const personRouter = require("./route.js")

// hello

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", personRouter)

app.listen(port, () => console.log(`server is running on port: ${port}`))


// AimCi0LivZ2Wi9CA