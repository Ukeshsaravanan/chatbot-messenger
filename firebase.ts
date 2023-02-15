import {getApp, getApps , initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAIK28G27c9AXXJYCfF7n1nouht87RALqQ",
    authDomain: "chatbot-messenger-80b2b.firebaseapp.com",
    projectId: "chatbot-messenger-80b2b",
    storageBucket: "chatbot-messenger-80b2b.appspot.com",
    messagingSenderId: "838395619817",
    appId: "1:838395619817:web:33d77d128e0c03c3560378"
  };
  // Initialize Firebase
  const app = getApps().length? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db }