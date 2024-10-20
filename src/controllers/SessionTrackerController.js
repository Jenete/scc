// SessionTrackerController.js
import * as SessionTrackerService from '../services/SessionTrackerService';
import ActivityController from './ActivityController';

// Get all sessions
export const getAllSessions = async () => {

  return await SessionTrackerService.getAllSessions();
};

// Add a new session
export const addSession = async (session) => {
  ActivityController.createActivity('Session added','added a session');

  return await SessionTrackerService.addSession(session);
};

// Update an existing session
export const updateSession = async (session) => {
  ActivityController.createActivity('Session updated','updated a session');

  return await SessionTrackerService.updateSession(session);
};

// Remove a session
export const removeSession = async (sessionId) => {
  ActivityController.createActivity('Session removed','removed a session');

  return await SessionTrackerService.removeSession(sessionId);
};

// Get a specific session by ID
export const getSessionById = async (sessionId) => {
  return await SessionTrackerService.getSessionById(sessionId);
};
