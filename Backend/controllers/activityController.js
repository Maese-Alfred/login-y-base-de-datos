import * as activity from "../models/userActivityModels.js";
import sql from "../config/db.js";

export const getAllActivities = async (req, res) => {
  try {
    const activities = await activity.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Error fetching activities" });
  }
}

export const getAllActivitiesByUser = async (req, res) => {
  const { userid} = req.params;
  try {
    const activities = await activity.getAllActivitiesByUser(userid);
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities by user:", error);
    res.status(500).json({ message: "Error fetching activities" });
  }
}

export const getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await activity.getActivityById(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching activity by ID:", error);
    res.status(500).json({ message: "Error fetching activity" });
  }
}

export const createActivity = async (req, res) => {
    const {usuarioid, accionRealizada, fechayHora} = req.body;
    try {
        const newActivity = await activity.createActivity({usuarioid, accionRealizada, fechayHora});
        res.status(201).json(newActivity);
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({ message: "Error creating activity" });
    }
}

export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { usuarioid, accionRealizada, fechayHora } = req.body;
  try {
    const updatedActivity = await activity.updateActivity(id, { usuarioid, accionRealizada, fechayHora });
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Error updating activity" });
  }
}

export const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedActivity = await activity.deleteActivity(id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Error deleting activity" });
  }
}