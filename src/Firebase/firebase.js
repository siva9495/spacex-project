import firebase from "firebase/compat/app";
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getDatabase } from 'firebase/database'
import 'firebase/compat/storage';
import 'firebase/storage'
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDeVVbOByWshHz9Xv7AG5NAcyi_xDaazic",
  authDomain: "streetdine-28b6e.firebaseapp.com",
  projectId: "streetdine-28b6e",
  storageBucket: "streetdine-28b6e.appspot.com",
  messagingSenderId: "723227849371",
  appId: "1:723227849371:web:8e9883cebea2474ececc3e",
  measurementId: "G-HSKE6YYY2Z"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}
  const analytics = firebase.analytics();
 const db = getDatabase();
 export { db, analytics }

 export default firebase;