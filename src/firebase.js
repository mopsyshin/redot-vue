import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDMU3Hbkk1jUty8U_TujolIatQmaWI3cRk",
  authDomain: "redot-8c066.firebaseapp.com",
  databaseURL: "https://redot-8c066.firebaseio.com",
  projectId: "redot-8c066",
  storageBucket: "",
  messagingSenderId: "176312930681"
});

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();