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

// Collection reference
const membersCollection = collection(db, "members");

// Get all members
export const dbgetAllMembers = async () => {
  const membersSnapshot = await getDocs(membersCollection);
  const membersList = membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return membersList;
};

// Add a new member
export const dbaddMember = async (newMember) => {
  const docRef = await addDoc(membersCollection, newMember);
  return { id: docRef.id, ...newMember };
};

// Update an existing member
export const dbupdateMember = async (updatedMember) => {
  const memberDoc = doc(db, "members", updatedMember.id);
  await updateDoc(memberDoc, updatedMember);
  return updatedMember;
};

// Remove a member by ID
export const dbremoveMember = async (memberId) => {
  const memberDoc = doc(db, "members", memberId);
  await deleteDoc(memberDoc);
};

// Get a specific member by ID
export const dbgetMemberById = async (memberId) => {
  const memberDoc = doc(db, "members", memberId);
  const memberSnapshot = await getDoc(memberDoc);
  if (memberSnapshot.exists()) {
    return { id: memberSnapshot.id, ...memberSnapshot.data() };
  } else {
    throw new Error("Member not found");
  }
};
