import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBDft0I86g3OB_QMaLyTIMUBXvmCHn2800",
    authDomain: "everest-4650a.firebaseapp.com",
    projectId: "everest-4650a",
    storageBucket: "everest-4650a.firebasestorage.app",
    messagingSenderId: "450005527323",
    appId: "1:450005527323:web:fea4984a10785d308a41be",
    measurementId: "G-6T9ZY3MB77",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
