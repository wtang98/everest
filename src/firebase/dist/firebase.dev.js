"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var firebaseConfig = {
  apiKey: "AIzaSyBDft0I86g3OB_QMaLyTIMUBXvmCHn2800",
  authDomain: "everest-4650a.firebaseapp.com",
  projectId: "everest-4650a",
  storageBucket: "everest-4650a.firebasestorage.app",
  messagingSenderId: "450005527323",
  appId: "1:450005527323:web:fea4984a10785d308a41be",
  measurementId: "G-6T9ZY3MB77"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;