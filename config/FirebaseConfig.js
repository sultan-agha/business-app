// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPUgJOB9KWyJWrJTGAfjNwtMOnCm4-D3w",
  authDomain: "business-app-a928b.firebaseapp.com",
  projectId: "business-app-a928b",
  storageBucket: "business-app-a928b.appspot.com",
  messagingSenderId: "339414270349",
  appId: "1:339414270349:web:cefd772ec84fab4114bdc4",
  measurementId: "G-MJSHCN2XSX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
export const storage=getStorage(app);
//const analytics = getAnalytics(app);