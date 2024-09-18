// MemberService.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWW2cidrB2D2EUZH4QElSzD_Kt7xDywDk",
    authDomain: "uhalisi-6d171.firebaseapp.com",
    projectId: "uhalisi-6d171",
    storageBucket: "uhalisi-6d171.appspot.com",
    messagingSenderId: "965949499764",
    appId: "1:965949499764:web:8642a02a9cc6145ef0e421"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services
const db = getFirestore(app);

const sessionsCollection = collection(db, "sessions");

export const getAllSessions = async () => {
  const sessionsSnapshot = await getDocs(sessionsCollection);
  const sessionsList = sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return sessionsList;
};

export const addSession = async (newSession) => {
  const docRef = await addDoc(sessionsCollection, newSession);
  return { id: docRef.id, ...newSession };
};

export const updateSession = async (updatedSession) => {
  const sessionDoc = doc(db, "sessions", updatedSession.id);
  await updateDoc(sessionDoc, updatedSession);
  return updatedSession;
};

export const removeSession = async (sessionId) => {
  const sessionDoc = doc(db, "sessions", sessionId);
  await deleteDoc(sessionDoc);
};

export const getSessionById = async (sessionId) => {
  const sessionDoc = doc(db, "sessions", sessionId);
  const sessionSnapshot = await getDoc(sessionDoc);
  if (sessionSnapshot.exists()) {
    return { id: sessionSnapshot.id, ...sessionSnapshot.data() };
  } else {
    throw new Error("Session not found");
  }
};
