import React, { useContext } from 'react'
import  firebase from "firebase/app";
import 'firebase/auth';
import { firebaseConfig } from './FireBaseConfig';
import { MyContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

export default function Login() {
  const [logInUser, setlogInUser]=useContext(MyContext)
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  function GoogleSignOut(){
    firebase.auth().signOut().then(() => {
      const newSignInUser={
        name:'',
        email:'',
        photo:'',
        login:false
      }
      setlogInUser(newSignInUser)
    }).catch((error) => {
      // An error happened.
    });
  }
  function FbSignIn(){
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var user = result.user;
    console.log(user)
  })
  .catch((error) => {
   
    var errorMessage = error.message;

  });

  }

  function GoogleSignIn(){
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName,email,photoURL} = result.user;
    const newSignInUser={
      name:displayName,
      email:email,
      photo:photoURL,
      login:true
    }
    setlogInUser(newSignInUser)
    history.replace(from);
  }).catch((error) => {
    var errorMessage = error.message;
  });
  }

  return (
    <div>
      <h1>This is Login page</h1>
     {
       logInUser.login? <button onClick={GoogleSignOut}>Sign Out</button>: <button onClick={GoogleSignIn}>Using Google</button>
     }
     <button onClick={FbSignIn}>Using Facebook</button>
    </div>
  )
}
