import * as ZoneConfiguration from '../models/zoneConfigurationModel.js';

export const createZoneConfiguration = async (req, res) => {
    const { capacidad, fechaDesde, fechaHasta } = req.body;
    try {
        const newZoneConfiguration = await ZoneConfiguration.createZoneConfiguration({
            capacidad,
            fechaDesde,
            fechaHasta
        });
        res.status(201).json(newZoneConfiguration);
    } catch (error) {
        console.error("Error creating zone configuration:", error);
        res.status(500).json({ message: "Error creating zone configuration" });
    }
}

export const getAllZoneConfigurations = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    try {
        const zoneConfigurations = await ZoneConfiguration.getAllZoneConfigurations(limit, offset);
        res.status(200).json(zoneConfigurations);
    } catch (error) {
        console.error("Error fetching zone configurations:", error);
        res.status(500).json({ message: "Error fetching zone configurations" });
    }
}

export const getZoneConfigurationById = async (req, res) => {
    const { id } = req.params;
    try {
        const zoneConfiguration = await ZoneConfiguration.getZoneConfigurationById(id);
        if (!zoneConfiguration) {
            return res.status(404).json({ message: "Zone configuration not found" });
        }
        res.status(200).json(zoneConfiguration);
    } catch (error) {
        console.error("Error fetching zone configuration by ID:", error);
        res.status(500).json({ message: "Error fetching zone configuration" });
    }
}

export const updateZoneConfiguration = async (req, res) => {
    const { id } = req.params;
    const { capacidad, fechaDesde, fechaHasta } = req.body;
    try {
        const updatedZoneConfiguration = await ZoneConfiguration.updateZoneConfiguration(id, {
            capacidad,
            fechaDesde,
            fechaHasta
        });
        if (!updatedZoneConfiguration) {
            return res.status(404).json({ message: "Zone configuration not found" });
        }
        res.status(200).json(updatedZoneConfiguration);
    } catch (error) {
        console.error("Error updating zone configuration:", error);
        res.status(500).json({ message: "Error updating zone configuration" });
    }
}

export const deleteZoneConfiguration = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedZoneConfiguration = await ZoneConfiguration.deleteZoneConfiguration(id);
        if (!deletedZoneConfiguration) {
            return res.status(404).json({ message: "Zone configuration not found" });
        }
        res.status(200).json({ message: "Zone configuration deleted successfully" });
    } catch (error) {
        console.error("Error deleting zone configuration:", error);
        res.status(500).json({ message: "Error deleting zone configuration" });
    }
}