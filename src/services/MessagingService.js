// MessagingService.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; 
import { db } from "./SessionTrackerService";
import ActivityController from "../controllers/ActivityController";

// Add Message
export const addMessage = async (message) => {
  try {
    await addDoc(collection(db, "messages"), message);
    ActivityController.createActivity('Message sent', 'sent a message');
  } catch (err) {
    console.error("Error sending message: ", err);
  }
};

// Get All Messages
export const getAllMessages = async () => {
  const messagesSnapshot = await getDocs(collection(db, "messages"));
  return messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update Message
export const updateMessage = async (id, updatedMessage) => {
  try {
    const messageRef = doc(db, "messages", id);
    await updateDoc(messageRef, updatedMessage);
    ActivityController.createActivity('Message updated', 'updated a message');
  } catch (err) {
    console.error("Error updating message: ", err);
  }
};

// Delete Message
export const deleteMessage = async (id) => {
  try {
    const messageRef = doc(db, "messages", id);
    await deleteDoc(messageRef);
    ActivityController.createActivity('Message deleted', 'deleted a message');
  } catch (err) {
    console.error("Error deleting message: ", err);
  }
};
