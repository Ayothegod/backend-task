const express = require("express")
const router = express.Router()

const {createPerson, getPerson, updatePerson, deletePerson} = require("./controller.js")

router.get("/:user_id", getPerson
)
router.post("/", createPerson)

router.patch("/:user_id", updatePerson)

router.delete("/:user_id", deletePerson)

module.exports = router