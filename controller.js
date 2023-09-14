const prisma = require("./lib/prisma.js");
const { validate } = require("./lib/validation.js");

// create person record function
const createPerson = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) return res.status(400).json("please provide a name");
    const { error, value } = validate(name);

    if (error) {
      return res.status(400).json("name attribute must be a string");
    }

    const checkName = await prisma.person.findUnique({
      where: {
        name: value,
      },
    });

    if (checkName) {
      return res.status(200).json({
        msg: `Person with name: '${value}' already exist, try another name.`,
      });
    }

    const user = await prisma.person.create({
      data: {
        name: value,
      },
    });

    res.status(201).json({
      msg: `Person with name: '${user.name}' has been created successfully`,
      personDetails: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong, try again later.");
  }
};

// get person record function
const getPerson = async (req, res) => {
  try {
    if (req.body.name) {
      const user = await prisma.person.findUnique({
        where: {
          name: req.body.name,
        },
      });
      return res.status(201).json({
        msg: `Person with name: '${user.name}' has been returned successfully`,
        personDetails: {
          id: user.id,
          name: user.name,
        },
      });
    }

    const user = await prisma.person.findUnique({
      where: {
        id: req.params.user_id,
      },
    });
    res.status(201).json({
      msg: `Person with id: '${user.id}' has been returned successfully`,
      personDetails: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(404).json({msg:"Wrong credentials! check and try again."});
  }
};

// update person record function
const updatePerson = async (req, res) => {
  try {
    const id = req.params.user_id;
    const name = req.body.name;
    if (!id || !name) {
      return res.status(401).json({
        msg: "You require user_id and name to update a user.",
      });
    }

    const { error, value } = validate(name);

    if (error) {
      return res.status(400).json("name attribute must be a string");
    }

    const checkName = await prisma.person.findUnique({
      where: {
        name: value,
      },
    });

    if (checkName) {
      return res.status(400).json({
        msg: `Person with name: '${value}' already exist, try another name.`,
      });
    }

    const updatedUser = await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        name: value,
      },
    });

    res.status(201).json({
      msg: `Person name has been updated successfully`,
      personDetails: {
        id: updatedUser.id,
        name: updatedUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({msg:"Network error, try again later."});
  }
};

// delete person record function
const deletePerson = async (req, res) => {
  try {
    const id = req.params.user_id;
    const deleteUser = await prisma.person.delete({
      where: {
        id: id,
      },
    });

    if (deleteUser) {
      return res.status(201).json({
        msg: `Person has been deleted successfully`,
        personDetails: {
          id: deleteUser.id,
        },
      });
    }

    res.status(200).json("person does not exist");
  } catch (error) {
    res.status(404).json("Person no longer exist.");
  }
};

module.exports = { createPerson, getPerson, updatePerson, deletePerson };
