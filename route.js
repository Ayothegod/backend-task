const express = require("express")
const router = express.Router()

const {createPerson, getPerson, updatePerson, deletePerson} = require("./controller.js")

router.get("/", getPerson
)
router.post("/", createPerson)

router.patch("/", updatePerson)

router.delete("/", deletePerson)

module.exports = router