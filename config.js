import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCVCRdX-S6iYDypNZEcDoUMoW5IJGUOP-g",
  authDomain: "moblietodoapp.firebaseapp.com",
  databaseURL: "https://moblietodoapp-default-rtdb.firebaseio.com",
  projectId: "moblietodoapp",
  storageBucket: "moblietodoapp.appspot.com",
  messagingSenderId: "662082448066",
  appId: "1:662082448066:web:5a16329f99c4b9041b295b",
  measurementId: "G-18TKL7T2VQ",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
