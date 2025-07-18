// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSY7WtYkTK2ZMvYAnFM4n3FvgnlK9Boz8",
  authDomain: "auditapp-f1f2b.firebaseapp.com",
  projectId: "auditapp-f1f2b",
  storageBucket: "auditapp-f1f2b.firebasestorage.app",
  messagingSenderId: "780386068052",
  appId: "1:780386068052:web:c727a0cd98fa840f34efc1",
  measurementId: "G-B2CRM2N8L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {app};