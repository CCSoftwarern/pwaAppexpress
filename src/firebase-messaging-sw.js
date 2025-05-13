importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyD4w3SZYFKMu37cD9npKZADoTyIFXU2nog",
  authDomain: "express-c6178.firebaseapp.com",
  projectId: "express-c6178",
  storageBucket: "express-c6178.firebasestorage.app",
  messagingSenderId: "427820307117",
  appId: "1:427820307117:web:067f65abd80af149556c24",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();