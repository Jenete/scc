// FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage,uploadBytes, getDownloadURL, ref as storageRef, listAll } from 'firebase/storage';

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
const firestore = getFirestore(app);
const storage = getStorage(app);


class FirestoreService {
    constructor(collectionName) {
      this.collectionRef = collection(firestore, collectionName);
    }
  
    // Get all documents in the collection
  async getAll(type) {
    try {
      const snapshot = await getDocs(this.collectionRef);

    //   console.log("Snapshot:", snapshot.docs); // Log snapshot to check structure

      let filteredDocs = [];

      if (type === 'songs') {
        filteredDocs = snapshot.docs.filter((doc) => {
          const data = doc.data();
          return data.audioUrl ? true : false; // Check if audioUrl exists
        });
      } else if (type === 'links') {
        filteredDocs = snapshot.docs.filter((doc) => {
          const data = doc.data();
          return data.url ? true : false; // Check if url exists
        });
      } else {
        filteredDocs = snapshot.docs.filter((doc) => {
          const data = doc.data();
          return data.fileUrl ? true : false; // Check if fileUrl exists
        });
      }

    //   console.log("Filtered Docs:", filteredDocs); // Log the filtered documents

      return filteredDocs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting all documents:', error);
      throw error; // Throw error to be handled by the caller
    }
  }

  async addPlannerData(plannerData) {
    try {
      await setDoc(doc(firestore, 'scc', 'plannerData'), plannerData);
      return { success: true };
    } catch (error) {
      console.error('Error adding planner data:', error);
      return { success: false, message: 'Error adding planner data' };
    }
  }

  async getPlannerData() {
    try {
      const docRef = doc(firestore, 'scc', 'plannerData');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      } else {
        return { success: false, message: 'No such document!' };
      }
    } catch (error) {
      console.error('Error getting planner data:', error);
      return { success: false, message: 'Error getting planner data' };
    }
  }

  async updatePlannerData(plannerData) {
    try {
      const docRef = doc(firestore, 'scc', 'plannerData');
      await updateDoc(docRef, plannerData);
      return { success: true, message: 'Planner data updated successfully' };
    } catch (error) {
      console.error('Error updating planner data:', error);
      return { success: false, message: 'Error updating planner data' };
    }
  }
  
    // Upload a file to Firebase Storage
    async uploadFile(path, file) {
      try {
        const storageReference = storageRef(storage, `${path}-${Date.now()}`);
        const uploadResult = await uploadBytes(storageReference, file);
        const downloadUrl = await getDownloadURL(uploadResult.ref);
        return downloadUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  
    // Add a new song with a file upload
    async addSong(song) {
      try {
        let audioUrl = '';
  
        if (song?.file) {
          audioUrl = await this.uploadFile(`songs/${song.title}`, song.file);
        }
  
        const newSong = {
          title: song.title,
          lyrics: song.lyrics,
          audioUrl,
        };
  
        await setDoc(doc(this.collectionRef), newSong);
  
        return { success: true, song: newSong };
      } catch (error) {
        console.error('Error adding song:', error);
        return { success: false, message: 'Error adding song' };
      }
    }

    

  
    // Add a new document
    async addDocument(title, file) {
      try {
        const fileUrl = await this.uploadFile(`documents/${title}`, file);
  
        const newDocument = {
          title,
          fileUrl,
        };
  
        await setDoc(doc(this.collectionRef), newDocument);
  
        return { success: true, document: newDocument };
      } catch (error) {
        console.error('Error adding document:', error);
        return { success: false, message: 'Error adding document' };
      }
    }
  
    // Add a new link
    async addLink(title, url) {
      try {
        const newLink = {
          title,
          url,
        };
  
        await setDoc(doc(this.collectionRef), newLink);
  
        return { success: true, link: newLink };
      } catch (error) {
        console.error('Error adding link:', error);
        return { success: false, message: 'Error adding link' };
      }
    }
  
    // Delete a document by ID
    async deleteById(id) {
      try {
        await deleteDoc(doc(this.collectionRef, id));
        return { success: true, message: 'Document deleted successfully' };
      } catch (error) {
        console.error('Error deleting document:', error);
        return { success: false, message: 'Error deleting document' };
      }
    }

    /**
   * Update a document in the Firestore collection.
   * @param {string} docId - The ID of the document to update.
   * @param {object} data - The data to update in the document.
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  async update(docId, data) {
    try {
      const docRef = doc(this.collectionRef, docId);

      // First, check if the document exists
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        return { success: false, message: 'Document not found' };
      }

      // Update the document with the new data
      await updateDoc(docRef, data);

      return { success: true, message: 'Document updated successfully' };
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, message: 'Error updating document' };
    }
  }
    /**
   * Update a document in the Firestore collection.
   * @param {string} docId - The ID of the document to update.
   * @param {object} data - The data to update in the document.
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  async getDownloadURLDB(folder, fileName) {
    try {

      const url = await getDownloadURL(storageRef(storage, `${folder}/${fileName}`));
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();

      // // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url)
      return url;
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, message: 'Error updating document' };
    }
  }
  async getDownloadURLDB(urlX) {
    try {

      const url = await getDownloadURL(urlX);
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();

      // // Or inserted into an <img> element
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url)
      return url;
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, message: 'Error updating document' };
    }
  }

  async getFiles() {
      const listRef = storageRef(storage, 'songs');
      const files = [];

      // Find all the prefixes and items.
      const res = await listAll(listRef);

      // Retrieve download URLs for all items in parallel.
      const downloadPromises = res.items.map(async (itemRef) => {
          const downloadURL = await getDownloadURL(itemRef);
          return { name: itemRef.name, href: downloadURL };
      });

      // Wait for all download promises to resolve.
      const fileData = await Promise.all(downloadPromises);

      // Push the resolved data to the files array.
      files.push(...fileData);

      return files;
  }

  
  }
  
  export default FirestoreService;

