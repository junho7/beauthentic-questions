import {useContext } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
// import "firebase/firestore";
import { functions } from "firebase";
import { AuthContext } from "../Provider/UserProvider";

const firebaseConfig = {
    apiKey: "AIzaSyCGHYKSYYuncbcp36p9qiAbi2fd0UfUeEg",
    authDomain: "beauthentic-questions.firebaseapp.com",
    databaseURL: "https://beauthentic-questions.firebaseio.com",
    projectId: "beauthentic-questions",
    storageBucket: "beauthentic-questions.appspot.com",
    messagingSenderId: "664885888225",
    appId: "1:664885888225:web:88fe8f6dea83daf5ef23a0",
    measurementId: "G-EF6954KFLL"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  // export const firestore = firebase.firestore();

  var database = firebase.database();

  // const authContext = useContext(AuthContext);
  const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    return auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  // const userRef = firestore.doc(`users/${user.uid}`);
  // const snapshot = await userRef.get();

  

  // if (!snapshot.exists) {
  //   const { email, displayName, photoURL } = user;
  //   try {
  //     await userRef.set({
  //       displayName,
  //       email,
  //       photoURL,
  //       ...additionalData
  //     });
  //   } catch (error) {
  //     console.error("Error creating user document", error);
  //   }



  // }
  const { email } = user.user;
  const {displayName} = user.displayName;
  
  database.ref('users/' + user.user.uid).set({
    displayName: displayName,
    email: email
  }, function(error) {
    if (error) {
      console.log("user write error")
    } else {
      console.log("user write success");
      var userId = firebase.auth().currentUser.uid;
      console.log("userID: "+userId);
      var rootRef = firebase.database().ref("users/"+userId);
      console.log("rootRef: "+rootRef);
      rootRef.once("value").then((snapshot)=>{console.log(snapshot)
      // database.ref('/users/' + userId).once('value').then(function(snapshot) {
        var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
      //   // ...
      });
    }
  });

  console.log("User: "+user);
  console.log("User: "+user.user);
  console.log("User: "+user.user.uid);
  console.log("User: "+user.uid);


  return getUserDocument(user.user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  console.log(uid);
  try {
    // const userDocument = await firestore.doc(`users/${uid}`).get();
    var userId = firebase.auth().currentUser.uid;
    // console.log("userID: "+userId);
    var rootRef = firebase.database().ref("users/"+userId);
    rootRef.once("value").then(function(snapshot) {
      var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
      // ...
    });;

    return {
      uid
      // ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getQuestionset = async (questionseturl) => {
  if (!questionseturl) return null;
  // console.log(uid);
  try {
    // const userDocument = await firestore.doc(`users/${uid}`).get();
    // var userId = firebase.auth().currentUser.uid;
    // console.log("userID: "+userId);
    var rootRef = firebase.database().ref("questionset/"+questionseturl);
    return await rootRef.once("value").then(function(snapshot) {
      // var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
      // var result = snapshot
      console.log(snapshot.val().questionset)
      var res = snapshot.val().questionset
      return res
      // ...
    });;
    // return rootRef.once("value").then((snapshot)=>{return snapshot.val().questionset})

    // return {
    //   result
    //   // ...userDocument.data()
    // };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getQuestionsetForModify = async (questionseturl) => {
  if (!questionseturl) return null;
  // console.log(uid);
  try {
    // const userDocument = await firestore.doc(`users/${uid}`).get();
    // var userId = firebase.auth().currentUser.uid;
    // console.log("userID: "+userId);
    var rootRef = firebase.database().ref("questionset/"+questionseturl);
    return await rootRef.once("value").then(function(snapshot) {
      // var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
      // var result = snapshot
      console.log(snapshot.val().questionset)
      var res = snapshot.val()
      return res
      // ...
    });;
    // return rootRef.once("value").then((snapshot)=>{return snapshot.val().questionset})

    // return {
    //   result
    //   // ...userDocument.data()
    // };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
  // class Firebase {
  //   constructor() {
  //     app.initializeApp(firebaseConfig);

  //     this.auth = app.auth();
  //   }

  //   doCreateUserWithEmailAndPassword = (email, password) =>
  //   this.auth.createUserWithEmailAndPassword(email, password);
 
  // doSignInWithEmailAndPassword = (email, password) =>
  //   this.auth.signInWithEmailAndPassword(email, password);

  //   doSignOut = () => this.auth.signOut();

  //   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  //   doPasswordUpdate = password =>
  //     this.auth.currentUser.updatePassword(password);
  // }
   
  // export default Firebase;


  export const createSet = async (setname, desc, questionset) => {
    // if (!user) return;
  
    const dt = new Date().getTime();
    var userId = firebase.auth().currentUser.uid;
    
    // var qs = {};
    // var data = {};
    // data[dt] = questionset
    // qs['questionset'] = JSON.parse( JSON.stringify(data ) );
    // console.log(questionset);
    // console.log(qs);
    // console.log(data);

    const item = {
      owner: userId,
      questionsetname: setname,
      desc: desc,
      questionset
    }

    // database.ref('users/' + userId + '/questionset/'+dt).set(item, function(error) {
    database.ref('/questionset/'+userId+dt).set(item, function(error) {
      if (error) {
        console.log("write error")
      } else {
        console.log("write success")
      }
    });
    database.ref('users/' + userId + '/questionset/'+userId+dt).set(setname, function(error) { 
      if (error) {
        console.log("write error")
      } else {
        console.log("write success")
      }
    });
  
    return (userId+dt)
    // return getUserDocument(userId);
  }
  export const updateSet = async (seturl, setname, desc, questionset) => {
    // if (!user) return;
  
    // const dt = new Date().getTime();
    // var userId = firebase.auth().currentUser.uid;
    
    // var qs = {};
    // var data = {};
    // data[dt] = questionset
    // qs['questionset'] = JSON.parse( JSON.stringify(data ) );
    // console.log(questionset);
    // console.log(qs);
    // console.log(data);

    const item = {
      // owner: userId,
      questionsetname: setname,
      desc: desc,
      questionset
    }

    // database.ref('users/' + userId + '/questionset/'+dt).set(item, function(error) {
    database.ref('/questionset/'+seturl).set(item, function(error) {
      if (error) {
        console.log("write error")
      } else {
        console.log("write success")
      }
    });
    // database.ref('users/' + userId + '/questionset/'+userId+dt).set(setname, function(error) { 
    //   if (error) {
    //     console.log("write error")
    //   } else {
    //     console.log("write success")
    //   }
    // });
  
    return 1;
  }


  export const getQuestionsetList = async () => {
    try {
      // const userDocument = await firestore.doc(`users/${uid}`).get();
      var userId = firebase.auth().currentUser.uid;
      console.log("userID: "+userId);
      var rootRef = firebase.database().ref("users/"+userId+"/questionset");
      return await rootRef.once("value").then(function(snapshot) {
        // var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
        // var result = snapshot
        console.log(snapshot.val())
        // console.log('c4yklqnblIhnT5CH9Y4y5Jpg50i11601800781605' in snapshot.val()) #working
        var res = snapshot.val()
        return res
        // ...
      });;
      // return rootRef.once("value").then((snapshot)=>{return snapshot.val().questionset})
  
      // return {
      //   result
      //   // ...userDocument.data()
      // };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };