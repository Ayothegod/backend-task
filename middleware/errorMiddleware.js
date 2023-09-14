//general error eg wrong route etc
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    res.status(statusCode).json({
        message:message,
        stack: "check the documentation for allowed endpoints and methods"
    })
}

// process.env.NODE_ENV === "development" ? null : err.stack
module.exports = {notFound, errorHandler}