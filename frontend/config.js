

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyDK0_SzaD4eVPykfVLXF-u0naa62ZgWkhk",
  authDomain: "zerotrash-2408f.firebaseapp.com",
  projectId: "zerotrash-2408f",
  storageBucket: "zerotrash-2408f.appspot.com",
  messagingSenderId: "552295512432",
  appId: "1:552295512432:web:08312b6002a6ff9c0ef7b5"
};*/
//THE Final CODE
import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore'; // for data storage in database
import { getAuth, signOut} from 'firebase/auth'; //needed to do firebase authentication
import * as SecureStore from 'expo-secure-store';



const BASE_URL = "http://192.168.8.176:3000/";


const firebaseConfig = {
  apiKey: "AIzaSyDK0_SzaD4eVPykfVLXF-u0naa62ZgWkhk",
  authDomain: "zerotrash-2408f.firebaseapp.com",
  projectId: "zerotrash-2408f",
  storageBucket: "zerotrash-2408f.appspot.com",
  messagingSenderId: "552295512432",
  appId: "1:552295512432:web:7ee0522dcc914a6b0ef7b5"
};

const logoutUser = async () => {
  try {
    await signOut(firebaseAuth);
    await SecureStore.deleteItemAsync('idToken').then(() => {
      console.log('User logged out successfully');
    })
  } catch (error) {
    console.error('Logout failed', error.message);
  }
};

//CHATGPT CODE 
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth =getAuth(firebaseApp);
//const firestoreDB = getFirestore(firebaseApp);

export { firebaseApp , firebaseAuth, logoutUser, BASE_URL};




