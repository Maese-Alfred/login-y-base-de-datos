import express from 'express';

import {createActivity,
    getActivityById,
    getAllActivities,
    updateActivity,
    deleteActivity,
    getAllActivitiesByUser
} from '../controllers/activityController.js';

const router = express.Router();

// Define the routes for activities
router.get('/', getAllActivities); // Get all activities
router.get('/user/:userid', getAllActivitiesByUser); // Get all activities by user ID
router.get('/:id', getActivityById); // Get activity by ID
router.post('/', createActivity); // Create a new activity
router.put('/:id', updateActivity); // Update an activity by ID
router.delete('/:id', deleteActivity); // Delete an activity by ID

export default router;

