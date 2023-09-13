const prisma = require("./lib/prisma.js")
const { validate } = require("./lib/validation.js")

const createPerson = async (req,res) => {
    try {
            const name = req.body.name
            if(!name) return res.status(400).json("please provide a name")
            const {error, value } = validate(name)

            if(error){
                return res.status(400).json("name attribute must be a string")
            }

            const checkName = await prisma.person.findUnique({
                where:{
                    name: value
                }
            })

            if(checkName){
                res.status(200).json({msg:`Person with name: '${value}' already exist, try another name.`})
            } 

            const user = await prisma.person.create({
                data:{
                    name: value
                }
            })

            res.status(201).json({
                msg: `Person with name: '${user.name}' has been created successfully`,
                userDetails:{
                    id: user.id,
                    name: user.name
                }
            })
      
    } catch (error) {
        console.log(error);
        res.status(404).json("Something went wrong, try again later.")
    }
}

const getPerson = async (req,res) => {
    try {
        if(req.body.name){
            const name = req.body.name
            res.status(200).json(name)
        } else if (req.body.user_id) {
            const user_id = req.body.user_id
            res.status(200).json(user_id)
        } else {
            res.status(400).json("only name and user_id acceptable")
        }
    } catch (error) {
        res.status(404).json("Network error! try again.")
    }
}
const updatePerson = async (req,res) => {
    res.json("patch request")
}
const deletePerson = async (req,res) => {
    res.json("delete request")
}

module.exports = {createPerson, getPerson, updatePerson, deletePerson}