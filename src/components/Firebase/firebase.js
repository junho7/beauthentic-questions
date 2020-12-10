import {useContext } from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
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

  var database = firebase.database();

  const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    return auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

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
        var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
      });
    }
  });

  return getUserDocument(user.user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  console.log(uid);
  try {

    var userId = firebase.auth().currentUser.uid;
    var rootRef = firebase.database().ref("users/"+userId);
    rootRef.once("value").then(function(snapshot) {
      var displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';

    });;

    return {
      uid
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getQuestionset = async (questionseturl) => {
  if (!questionseturl) return null;
  try {
    var rootRef = firebase.database().ref("questionset/"+questionseturl);
    return await rootRef.once("value").then(function(snapshot) {
      console.log(snapshot.val().questionset)
      var res = snapshot.val().questionset
      return res

    });;

  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getQuestionsetForModify = async (questionseturl) => {
  if (!questionseturl) return null;

  try {

    var rootRef = firebase.database().ref("questionset/"+questionseturl);
    return await rootRef.once("value").then(function(snapshot) {

      console.log(snapshot.val().questionset)
      var res = snapshot.val()
      return res
    });;

  } catch (error) {
    console.error("Error fetching user", error);
  }
};


  export const createSet = async (setname, desc, questionset) => {
    const dt = new Date().getTime();
    var userId = firebase.auth().currentUser.uid;
    
    const item = {
      owner: userId,
      questionsetname: setname,
      desc: desc,
      questionset
    }

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
  }
  export const updateSet = async (seturl, setname, desc, questionset) => {

    const item = {
      questionsetname: setname,
      desc: desc,
      questionset
    }

    database.ref('/questionset/'+seturl).set(item, function(error) {
      if (error) {
        console.log("write error")
      } else {
        console.log("write success")
      }
    });
  
    return 1;
  }


  export const getQuestionsetList = async () => {
    try {
      var userId = firebase.auth().currentUser.uid;
      var rootRef = firebase.database().ref("users/"+userId+"/questionset");
      return await rootRef.once("value").then(function(snapshot) {
        var res = snapshot.val()
        return res
      });;

    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
