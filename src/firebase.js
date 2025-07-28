// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDSY7WtYkTK2ZMvYAnFM4n3FvgnlK9Boz8",
  authDomain: "auditapp-f1f2b.firebaseapp.com",
  projectId: "auditapp-f1f2b",
  storageBucket: "auditapp-f1f2b.firebasestorage.app",
  messagingSenderId: "780386068052",
  appId: "1:780386068052:web:c727a0cd98fa840f34efc1",
  measurementId: "G-B2CRM2N8L3"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default { messaging, getToken, onMessage };
