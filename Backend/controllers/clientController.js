import * as Client from "../models/clientModel.js";

export const createClient = async (req, res) => {
  const { nombre, apellido, telefono, correo } = req.body;
  try {
    const newClient = await Client.createClient({ nombre, apellido, telefono, correo });
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "Error creating client" });
  }
}

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Error fetching clients" });
  }
}

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.getClientById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    res.status(500).json({ message: "Error fetching client" });
  }
}

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, correo } = req.body;
  try {
    const updatedClient = await Client.updateClient(id, { nombre, apellido, telefono, correo });
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Error updating client" });
  }
}

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await Client.deleteClient(id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(deletedClient);
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Error deleting client" });
  }
}