// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
//import Firestore from "@google-cloud/firestore";
import { getAuth, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1WBVVJjWnEEPyxhfcNAFORAdphDmF6vg",
  authDomain: "unify-ee0a5.firebaseapp.com",
  projectId: "unify-ee0a5",
  storageBucket: "unify-ee0a5.appspot.com",
  messagingSenderId: "19184922246",
  appId: "1:19184922246:web:bc18de38719fb6e2ed2b07",
  measurementId: "G-DDRGQ9N3Y9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const db = new Firestore({
//     projectId: 'unify-ee0a5',
//     keyFilename: 'unify-328418-c8687e44be6e.json',
// });

const googleProvider = new GoogleAuthProvider();

/*const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};*/

const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        // await db.collection("users").add({
        // uid: user.uid,
        // name,
        // authProvider: "local",
        // email,
        // });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    };
    const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    //db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};