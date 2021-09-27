import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8KduG6C8c2a_FFRVTBc77iv-xzk-QZ9M",
  authDomain: "social-media-8de56.firebaseapp.com",
  projectId: "social-media-8de56",
  storageBucket: "social-media-8de56.appspot.com",
  messagingSenderId: "184701331187",
  appId: "1:184701331187:web:f6d8c3ab4567a9da6b7986",
  measurementId: "G-T2YWNY2NQX",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
