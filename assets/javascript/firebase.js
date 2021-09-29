// Your web app's Firebase configuration

// var firebaseConfig = {
//     apiKey: "AIzaSyBPVoqQXKFDk2Y2w2r9IGrekUTLkGROCWg",
//     authDomain: "sozentech-learn-more.firebaseapp.com",
//     databaseURL: "https://sozentech-learn-more-default-rtdb.firebaseio.com",
//     projectId: "sozentech-learn-more",
//     storageBucket: "sozentech-learn-more.appspot.com",
//     messagingSenderId: "84894145187",
//     appId: "1:84894145187:web:915a613c735ba1cb25bd16",
//     measurementId: "G-PPY8N7W96L"
//   };


var firebaseConfig = {
  apiKey: "AIzaSyANHbKdhQnOhXWPDpexAyalaRVJsu9WPn8",
  authDomain: "authdemo-7b89f.firebaseapp.com",
  databaseURL: "https://authdemo-7b89f-default-rtdb.firebaseio.com",
  projectId: "authdemo-7b89f",
  storageBucket: "authdemo-7b89f.appspot.com",
  messagingSenderId: "189943601997",
  appId: "1:189943601997:web:b4428a04413cb77e6f3504"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// get auth and firestore references

const auth = firebase.auth();


// const db = firebase.firestore();

// // update firestore settings
// db.settings({ timestampsInSnapshots: true});

// ---Register Functionality---
// const registerEmail = document.getElementById("")

// const courseCodeRegister = document.getElementById("courseCodeRegister");
// const btnRegisterCourse = document.getElementById('btnRegisterCourse');

// btnRegisterCourse.addEventListener("click", () => {
//   const courseCode = courseCodeRegister.value;
// })