const userRepository = require("../repository/userRepository");

async function createUser(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const insertedId = await userRepository.insertUser(name);
    res.status(201).json({ id: insertedId });
  } catch (error) {
    console.error("Error in createUser: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userRepository.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createUser,
  getUserById
};
