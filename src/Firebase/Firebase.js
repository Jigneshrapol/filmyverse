import {collection, getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import App from "../App";


const firebaseConfig = {
  apiKey: "AIzaSyBFcF0s6h34PFGy8i1sHb_7l3curwm8PXI",
  authDomain: "filmyverse-3d4a7.firebaseapp.com",
  projectId: "filmyverse-3d4a7",
  storageBucket: "filmyverse-3d4a7.appspot.com",
  messagingSenderId: "160063526871",
  appId: "1:160063526871:web:4960ff6300b0158dc19d92",
};
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const MoviesRef=collection(db,"Movies");
export const ReviewsRef=collection(db,"Reviews");
export const auth=getAuth(app);
export const UserRef=collection(db,"Users");
