import * as user from "../models/userModels.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await user.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
}

export const getUserByUID = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await user.getUserByUID(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by UID:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
}

export const createUser = async (req, res) => {
  const { uid_firebase, nombre, correo } = req.body;
  console.log("Datos a crear usuario:", { uid_firebase, nombre,correo });
  console.log("Cuerpo enviado",req.body);
  try {
    const newUser = await user.createUser({ uid_firebase, nombre, correo });
    res.status(201).json(newUser);
    console.log("nuevo usuario",newUser);
  } catch (error) {
  console.error("Error creating user:", error);
  res.status(500).json({ message: "Error creating user", error: error.message });
}
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { uid_firebase, nombre, correo, tipoUsuarioID } = req.body;
  try {
    const updatedUser = await user.updateUser(id, { uid_firebase, nombre, correo, tipoUsuarioID });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await user.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
}
