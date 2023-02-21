import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAHthZ5KFcB6TMxYjDEPW-gAX-cz0fjQh0",
  authDomain: "cooperative-a3cf7.firebaseapp.com",
  projectId: "cooperative-a3cf7",
  storageBucket: "cooperative-a3cf7.appspot.com",
  messagingSenderId: "1003828300769",
  appId: "1:1003828300769:web:090b9fd657e5f6f5e320a0",
  measurementId: "G-K11FBM7RHK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// $(".signUp").click(function () {
//   alert("111")
//   // let userEmail = document.getElementById("email").value;
//   // let secUserEmail = document.getElementById("secEmail").value;

//   // let userPass = document.getElementById("user_password").value;
//   // let secUserPass = document.getElementById("confirm_password").value;

//   // alert(userEmail);
// });

  // function reg() {
  //   let userEmail = document.getElementById("email").value;
  //   let secUserEmail = document.getElementById("secEmail").value;
  
  //   let userPass = document.getElementById("user_password").value;
  //   let secUserPass = document.getElementById("confirm_password").value;
  
  //   // case the Email and password is not the same in all the textboxs
  //   if (userEmail != secUserEmail || userPass != secUserPass) {
  //     alert("מייל או סיסמה לא תואמים");
  //     return;
  //   }
  
  //   // // case user didnt press the checkbox
  //   // else if (!document.getElementById("remember").checked) {
  //   //   alert("check box")
  //   //   return;
  //   // }
  
  //   // case user already exsist
  //   // alert("new")
  //   // firebase
  //   //   .auth()
  //   //   .signInWithEmailAndPassword(userEmail, userPass)
  //   //   .then(function (firebaseUser) {
  //   //     alert("משתמש כבר קיים");
  //   //     return;
  //   //   });
  
  //   // make a new user
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(userEmail, userPass)
  //     .then((userCredential) => {
  //       // Signed in
  //       var user = userCredential.user.uid;
        
  //       // add data of user to realtime firebase
  //       firebase
  //         .database()
  //         .ref("Users/" + user)
  //         .set({
  //           user_uid: user,
  //           User_email: userEmail,
  //           User_permission: userCredential.user.emailVerified
  //         });
  
  //       alert("משתמש נוצר בהצלחה");
  //       $("#remail").val("")
  //       $("#secremail").val("")
  //       $("#rpass").val("")
  //       $("#secrpass").val("")
  //     })

  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       alert(errorCode);
  //       alert(errorMessage);
  //       // ..
  //     });
  // }
  
  // // if user exsist and user press to move to login page
  // function log() {
  //   window.location.href = "login.html";
  // }

