import logo from './logo.svg';
import './App.css';
import * as  firebase from 'firebase/app';
import * as  firestore from 'firebase/firestore';
import { getAuth, signInAnonymously } from "firebase/auth";
import { CalendarView } from './CalendarView';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBbZLmKtqwDs3V-wPQL7ZovFTxdLQ_-Umo",
  authDomain: "the-calendar-c3953.firebaseapp.com",
  projectId: "the-calendar-c3953",
  storageBucket: "the-calendar-c3953.appspot.com",
  messagingSenderId: "479345417402",
  appId: "1:479345417402:web:5085f901612b2db07b3683",
  measurementId: "G-E59TD904WT"
};


const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



function App() {

  const [user] = useAuthState(auth);


  return (
    <div className="App">
      <header className="App-header">
        <section>
          {user ? db !== undefined ? < CalendarView db={db} /> : <>Initiliaxing </> : <SignIn />}
        </section>
      </header>
    </div>
  );
}


const SignIn = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("Signed In");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.code, error.message);

    });
  return (
    <>
      Authenticating...
    </>
  )
};

export default App;
