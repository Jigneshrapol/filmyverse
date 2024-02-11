import {collection, getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import App from "../App";


const firebaseConfig = {
  apiKey:"",
  authDomain:"",
  projectId:"",
  storageBucket:"",
  messagingSenderId: "",
  appId: ""
};
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const MoviesRef=collection(db,"Movies");
export const ReviewsRef=collection(db,"Reviews");
export const auth=getAuth(app);
export const UserRef=collection(db,"Users");
