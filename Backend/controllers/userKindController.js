import * as UserKind from "../models/userKindModel.js";

export const getAllKindUser = async (req, res) => {
  try {
    const kindUsers = await UserKind.getAllKindUser();
    res.status(200).json(kindUsers);
  } catch (error) {
    console.error("Error fetching user kinds:", error);
    res.status(500).json({ message: "Error fetching user kinds" });
  }
}

export const getKindUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const kindUser = await UserKind.getKindUserById(id);
    if (!kindUser) {
      return res.status(404).json({ message: "User kind not found" });
    }
    res.status(200).json(kindUser);
  } catch (error) {
    console.error("Error fetching user kind by ID:", error);
    res.status(500).json({ message: "Error fetching user kind" });
  }
}



export const createKindUser = async (req, res) => {
  const { descripcion } = req.body;
  try {
    const newKindUser = await UserKind.createKindUser(descripcion);
    res.status(201).json(newKindUser);
  } catch (error) {
    console.error("Error creating user kind:", error);
    res.status(500).json({ message: "Error creating user kind" });
  }
}

export const updateKindUser = async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  try {
    const updatedKindUser = await UserKind.updateKindUser(id, descripcion);
    if (!updatedKindUser) {
      return res.status(404).json({ message: "User kind not found" });
    }
    res.status(200).json(updatedKindUser);
  } catch (error) {
    console.error("Error updating user kind:", error);
    res.status(500).json({ message: "Error updating user kind" });
  }
}

export const deleteKindUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedKindUser = await UserKind.deleteKindUser(id);
    if (!deletedKindUser) {
      return res.status(404).json({ message: "User kind not found" });
    }
    res.status(200).json(deletedKindUser);
  } catch (error) {
    console.error("Error deleting user kind:", error);
    res.status(500).json({ message: "Error deleting user kind" });
  }
}