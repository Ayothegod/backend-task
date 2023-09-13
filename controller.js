const { z } = require("zod")
const prisma = require("./lib/prisma.js")

const createPerson = async (req,res) => {
    try {
            const name = req.body.name

            // const checkName = await prisma.person.findUnique({
            //     where:{
            //         name: name
            //     }
            // })
            // if(checkName){
            //     res.json("name already exist, try another name")
            // } 
            // const user = await prisma.person.create({
            //     data:{
            //         name: name
            //     }
            // })
            // res.status(200).json({
            //     msg: `person with name: ${user.name} has been created successfully`,
            //     userDetails:{
            //         id: user.id,
            //         name: user.name
            //     }
            // })
      
    } catch (error) {
        res.status(404).json("Network error! try again.")
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