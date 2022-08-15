import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGAsxVI4qQ52Tzhti9G5wdmfSXWGqZONk",
  authDomain: "events7-4fd4c.firebaseapp.com",
  projectId: "events7-4fd4c",
  storageBucket: "events7-4fd4c.appspot.com",
  messagingSenderId: "235795348639",
  appId: "1:235795348639:web:be52f7212502b5528536aa",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
