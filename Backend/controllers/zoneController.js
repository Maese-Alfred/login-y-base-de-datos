import * as Zone from "../models/zoneModel.js";

export const createZone = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const newZone = await Zone.createZone(req.body);
        res.status(201).json(newZone);
    }
    catch (error) {
        console.error("Error creating zone:", error);
        res.status(500).json({ message: "Error creating zone" });
    }
}

export const getAllZones = async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const zones = await Zone.getAllZones(limit, offset);
        res.status(200).json(zones);
    } catch (error) {
        console.error("Error fetching all zones:", error);
        res.status(500).json({ message: "Error fetching all zones" });
    }
}

export const getZoneById = async (req, res) => {
    const { id } = req.params;
    try {
        const zone = await Zone.getZoneById(id);
        if (!zone) {
            return res.status(404).json({ message: "Zone not found" });
        }
        res.status(200).json(zone);
    } catch (error) {
        console.error("Error fetching zone by ID:", error);
        res.status(500).json({ message: "Error fetching zone by ID" });
    }
}

export const updateZone = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const updatedZone = await Zone.updateZone(id, req.body);
        if (!updatedZone) {
            return res.status(404).json({ message: "Zone not found" });
        }
        res.status(200).json(updatedZone);
    } catch (error) {
        console.error("Error updating zone:", error);
        res.status(500).json({ message: "Error updating zone" });
    }
}

export const deleteZone = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedZone = await Zone.deleteZone(id);
        if (!deletedZone) {
            return res.status(404).json({ message: "Zone not found" });
        }
        res.status(200).json({ message: "Zone deleted successfully" });
    } catch (error) {
        console.error("Error deleting zone:", error);
        res.status(500).json({ message: "Error deleting zone" });
    }
}

export const getZoneDisponibilityWithConfigurationByDate = async (req, res) => {
    const { date, id } = req.params;

    if (!date) {
        return res.status(400).json({ message: "La fecha es obligatoria." });
    }
    if (!id) {
        return res.status(400).json({ message: "El ID es obligatorio." });
    }

    try {
        const zones = await Zone.getZoneDisponibilityWithConfigurationByDate(date, id);
        res.status(200).json(zones);
    } catch (error) {
        console.error("Error fetching zones availability by date:", error);
        res.status(500).json({ message: "Error fetching zones availability by date" });
    }
};

export const getZonesWithBooking = async (req, res) => {
    const { fecha } = req.params;
    try {
        const zones = await Zone.getZonesWithBooking(fecha);
        res.status(200).json(zones);
    } catch (error) {
        console.error("Error fetching zones with booking:", error);
        res.status(500).json({ message: "Error fetching zones with booking" });
    }
}

