// MemberService.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWW2cidrB2D2EUZH4QElSzD_Kt7xDywDk",
    authDomain: "uhalisi-6d171.firebaseapp.com",
    projectId: "uhalisi-6d171",
    storageBucket: "uhalisi-6d171.appspot.com",
    messagingSenderId: "965949499764",
    appId: "1:965949499764:web:8642a02a9cc6145ef0e421"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection references
const membersCollection = collection(db, "members");
const contactsCollection = collection(db, "contactsOutreach");

// Helper function to map document snapshots to data
const mapDocSnapshots = (snapshot) => {
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ** Members CRUD Operations **

// Get all members
export const dbgetAllMembers = async () => {
    const membersSnapshot = await getDocs(membersCollection);
    return mapDocSnapshots(membersSnapshot);
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

// ** Contacts CRUD Operations **

// Get all contacts
export const dbgetAllContacts = async () => {
    const contactsSnapshot = await getDocs(contactsCollection);
    return mapDocSnapshots(contactsSnapshot);
};

// Add a new contact
export const dbaddContact = async (newContact) => {
    const docRef = await addDoc(contactsCollection, newContact);
    return { id: docRef.id, ...newContact };
};

// Update an existing contact by attribute id
export const dbupdateContact = async (updatedContact) => {
  // Find the contact in the contacts collection based on the attribute id
  const contactsSnapshot = await getDocs(contactsCollection);
  const contactToUpdate = contactsSnapshot.docs.find(doc => doc.data().id === updatedContact.id);

  if (contactToUpdate) {
      const contactDoc = doc(db, "contactsOutreach", contactToUpdate.id);
      await updateDoc(contactDoc, updatedContact);
      return updatedContact;
  } else {
      throw new Error("Contact not found");
  }
};

// Remove a contact by attribute id
export const dbremoveContact = async (contactId) => {
  // Find the contact in the contacts collection based on the attribute id
  const contactsSnapshot = await getDocs(contactsCollection);
  const contactToDelete = contactsSnapshot.docs.find(doc => doc.data().id === contactId);

  if (contactToDelete) {
      const contactDoc = doc(db, "contactsOutreach", contactToDelete.id);
      await deleteDoc(contactDoc);
  } else {
      throw new Error("Contact not found");
  }
};

