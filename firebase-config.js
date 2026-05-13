  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM",
    authDomain: "acslearn-platform.firebaseapp.com",
    projectId: "acslearn-platform",
    storageBucket: "acslearn-platform.firebasestorage.app",
    messagingSenderId: "435395814481",
    appId: "1:435395814481:web:655f99452a90f8efbc4470"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
