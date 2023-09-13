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
                return res.status(200).json({msg:`Person with name: '${value}' already exist, try another name.`})
            } 

            const user = await prisma.person.create({
                data:{
                    name: value
                }
            })

            res.status(201).json({
                msg: `Person with name: '${user.name}' has been created successfully`,
                personDetails:{
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
            const user = await prisma.person.findUnique({
                where:{
                    name: req.body.name
                }
            })
            return res.status(201).json({
                msg: `Person with name: '${user.name}' has been returned successfully`,
                personDetails:{
                    id: user.id,
                    name: user.name
                }
            })
        }

        const user = await prisma.person.findUnique({
            where:{
                id: req.params.user_id
            }
        })
        res.status(201).json({
            msg: `Person with id: '${user.id}' has been returned successfully`,
            personDetails:{
                id: user.id,
                name: user.name
            }
        })
    } catch (error) {
        res.status(500).json("Network error! try again.")
    }
}
const updatePerson = async (req,res) => {
    res.json("patch request")
}
const deletePerson = async (req,res) => {
    res.json("delete request")
}

module.exports = {createPerson, getPerson, updatePerson, deletePerson}