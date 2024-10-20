import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./SessionTrackerService";
import ActivityController from "../controllers/ActivityController";

// Add Bacenta
export const addBacenta = async (bacenta) => {
  try {
    await addDoc(collection(db, "bacentas"), bacenta);
    ActivityController.createActivity('Bacenta added','added a bacenta');
  } catch (err) {
    console.error("Error adding bacenta: ", err);
  }
};

// Get All Bacentas
export const getAllBacentas = async () => {
  const bacentasSnapshot = await getDocs(collection(db, "bacentas"));
  return bacentasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update Bacenta
export const updateBacenta = async (id, updatedBacenta) => {
  try {
    const bacentaRef = doc(db, "bacentas", id);
    await updateDoc(bacentaRef, updatedBacenta);
    ActivityController.createActivity('Bacenta updated','updated a bacenta');

  } catch (err) {
    console.error("Error updating bacenta: ", err);
  }
};

// Delete Bacenta
export const deleteBacenta = async (id) => {
  try {
    const bacentaRef = doc(db, "bacentas", id);
    await deleteDoc(bacentaRef);
    ActivityController.createActivity('Bacenta deleted','deleted a bacenta');

  } catch (err) {
    console.error("Error deleting bacenta: ", err);
  }
};
