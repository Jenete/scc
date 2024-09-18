// SessionTrackerController.js
import * as SessionTrackerService from '../services/SessionTrackerService';

// Get all sessions
export const getAllSessions = async () => {
  return await SessionTrackerService.getAllSessions();
};

// Add a new session
export const addSession = async (session) => {
  return await SessionTrackerService.addSession(session);
};

// Update an existing session
export const updateSession = async (session) => {
  return await SessionTrackerService.updateSession(session);
};

// Remove a session
export const removeSession = async (sessionId) => {
  return await SessionTrackerService.removeSession(sessionId);
};

// Get a specific session by ID
export const getSessionById = async (sessionId) => {
  return await SessionTrackerService.getSessionById(sessionId);
};
