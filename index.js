const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3001

const { errorHandler, notFound } = require("./middleware/errorMiddleware.js")
const personRouter = require("./route.js")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", personRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server is running on port: ${port}`))


// AimCi0LivZ2Wi9CA