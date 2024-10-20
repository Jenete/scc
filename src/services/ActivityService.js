import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./SessionTrackerService";

// Collection name (to avoid repetition)
const ACTIVITY_COLLECTION = "activities";

// Add Activity
export const addActivity = async (activity) => {
  try {
    await addDoc(collection(db, ACTIVITY_COLLECTION), activity);
  } catch (err) {
    console.error("Error adding activity: ", err);
  }
};

// Get All Activities
export const getAllActivities = async () => {
  try {
    const activitiesSnapshot = await getDocs(collection(db, ACTIVITY_COLLECTION));
    return activitiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching activities: ", err);
  }
};

// Update Activity
export const updateActivity = async (id, updatedActivity) => {
  try {
    const activityRef = doc(db, ACTIVITY_COLLECTION, id);
    await updateDoc(activityRef, updatedActivity);
  } catch (err) {
    console.error("Error updating activity: ", err);
  }
};

// Delete Activity
export const deleteActivity = async (id) => {
  try {
    const activityRef = doc(db, ACTIVITY_COLLECTION, id);
    await deleteDoc(activityRef);
  } catch (err) {
    console.error("Error deleting activity: ", err);
  }
};
