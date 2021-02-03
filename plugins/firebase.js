import firebase from 'firebase';

var firebaseConfig =
  {
    apiKey: "AIzaSyDAWJil8m0vVkq6sdSH7Hcix4HIuLUaSxg",
    authDomain: "social-media-auth-a092b.firebaseapp.com",
    databaseURL: "https://social-media-auth-a092b.firebaseio.com",
    projectId: "social-media-auth-a092b",
    storageBucket: "social-media-auth-a092b.appspot.com",
    messagingSenderId: "812810120918",
    appId: "1:812810120918:web:5da539978bac6b4313e377",
    measurementId: "G-VPVXR71FM5"
  }

//initialize app


let app = null;

if(firebase.app.length){
  app = firebase.initializeApp(firebaseConfig)
}

export default firebase
