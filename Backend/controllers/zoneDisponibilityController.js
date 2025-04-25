import * as ZoneDisponibility from "../models/zoneDisponibilityModel.js";

export const createZoneDisponibility = async (req, res) => {
    const { zonaid, fecha, horainicio, horafin, disponible } = req.body;

    // Validar que las fechas y horas sean coherentes
    if (new Date(horainicio) >= new Date(horafin)) {
        return res.status(400).json({ message: "La hora de inicio no puede ser mayor o igual a la hora de fin." });
    }

    try {
        const newDisponibility = await ZoneDisponibility.createZoneDisponibility(req.body);
        res.status(201).json(newDisponibility);
    } catch (error) {
        console.error("Error creating zone disponibility:", error);
        res.status(500).json({ message: "Error creating zone disponibility" });
    }
}

export const getDisponibilitywithZone = async (req, res) => {
    const { id } = req.params;
    try {
        const disponibility = await ZoneDisponibility.getDisponibilitywithZone(id);
        res.status(200).json(disponibility);
    } catch (error) {
        console.error("Error fetching zone disponibility:", error);
        res.status(500).json({ message: "Error fetching zone disponibility" });
    }
}

export const getDisponibilityByDate = async (req, res) => {
    const { fecha } = req.params;
    const { limit, offset } = req.query;
    try {
        const disponibility = await ZoneDisponibility.getDisponibilityByDate(fecha, limit, offset);
        res.status(200).json(disponibility);
    } catch (error) {
        console.error("Error fetching zone disponibility by date:", error);
        res.status(500).json({ message: "Error fetching zone disponibility by date" });
    }
}

export const getDisponibilityByZoneId = async (req, res) => {
    const { id } = req.params;
    try {
        const disponibility = await ZoneDisponibility.getDisponibilityByZoneId(id);
        res.status(200).json(disponibility);
    } catch (error) {
        console.error("Error fetching zone disponibility by zone ID:", error);
        res.status(500).json({ message: "Error fetching zone disponibility by zone ID" });
    }
}

export const updateZoneDisponibility = async (req, res) => {
    const { id } = req.params;
    const { fecha, horainicio, horafin, disponible } = req.body;

    // Validar que las fechas y horas sean coherentes
    if (new Date(horainicio) >= new Date(horafin)) {
        return res.status(400).json({ message: "La hora de inicio no puede ser mayor o igual a la hora de fin." });
    }

    try {
        const updatedDisponibility = await ZoneDisponibility.updateZoneDisponibility(id, req.body);
        res.status(200).json(updatedDisponibility);
    } catch (error) {
        console.error("Error updating zone disponibility:", error);
        res.status(500).json({ message: "Error updating zone disponibility" });
    }
}

export const deleteZoneDisponibility = async (req, res) => {
    const { id } = req.params;
    try {
        await ZoneDisponibility.deleteZoneDisponibility(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting zone disponibility:", error);
        res.status(500).json({ message: "Error deleting zone disponibility" });
    }
}