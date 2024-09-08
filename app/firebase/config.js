import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFPwkEvz_ZummUh-BEDnn-cRg3AdnDFsQ",
  authDomain: "coderhouse-king.firebaseapp.com",
  projectId: "coderhouse-king",
  storageBucket: "coderhouse-king.appspot.com",
  messagingSenderId: "364630155796",
  appId: "1:364630155796:web:f963a43b8cca28a6a17d01",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
