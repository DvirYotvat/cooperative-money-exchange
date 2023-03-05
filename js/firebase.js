// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAHthZ5KFcB6TMxYjDEPW-gAX-cz0fjQh0",
  authDomain: "cooperative-a3cf7.firebaseapp.com",
  databaseURL: "https://cooperative-a3cf7-default-rtdb.firebaseio.com",
  projectId: "cooperative-a3cf7",
  storageBucket: "cooperative-a3cf7.appspot.com",
  messagingSenderId: "1003828300769",
  appId: "1:1003828300769:web:090b9fd657e5f6f5e320a0",
  measurementId: "G-K11FBM7RHK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/*----------------------------------------------------------------index ------------------------------------------------------------------------------------------------*/

/*----------------------------------------
                        register
    ------------------------------------------*/
function reg() {
  let userEmail = document.getElementById("email").value;
  let secUserEmail = document.getElementById("secEmail").value;

  let userPass = document.getElementById("user_password").value;
  let secUserPass = document.getElementById("confirm_password").value;

  // case the Email and password is not the same in all the textboxs
  if (userEmail != secUserEmail || userPass != secUserPass) {
    alert("email or password is incorrect");
    return;
  }

  // case user didnt press the checkbox
  if (!$("#terms").is(":checked")) {
    $("#email").val("");
    $("#secEmail").val("");
    $("#user_password").val("");
    $("#confirm_password").val("");
    alert("you must agree to terms of service");
    return;
  }

  // case user already exist
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      alert(firebaseUser.user.uid);
      alert("user alrady exist");
      return;
    });

  // make a new user
  const email = userEmail;
  const password = userPass;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User account created successfully
      const user = userCredential.user;

      alert("user created");
      $("#email").val("");
      $("#secEmail").val("");
      $("#user_password").val("");
      $("#confirm_password").val("");

      // send email verification
      user.sendEmailVerification();

      const userData = {
        uid: user.uid,
        first_name: "user",
        last_name: "user",
        email: email,
        phone: "000-000000000",
        image_url: "",
        rate: "0/5",
        review: "0",
      };

      // create user on database
      firebase
        .database()
        .ref("users/" + user.uid)
        .set(userData);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

/*----------------------------------------
                        login
    ------------------------------------------*/
function login() {
  var userEmail = document.getElementById("username").value;
  var userPass = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      // check if email address has been verified
      if (!firebaseUser.user.emailVerified) {
        const result = window.confirm(
          "email address has not been verified, resend email verification?"
        );
        if (result) firebaseUser.user.sendEmailVerification();
        return;
      }
      // check if we can use local storage
      if (typeof Storage !== "undefinde") {
        localStorage.userID = firebaseUser.user.uid;
        localStorage.email = firebaseUser.user.email;
        localStorage.p = userPass;

        // check if "Remember Me" is checked
        if ($("#remember").is(":checked")) {
          // Set expiration date of 24 hours from now
          const expirationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          const expirationDate = new Date(
            Date.now() + expirationMs
          ).toUTCString();
          sessionStorage.setItem("expiration", expirationDate);
        }

        window.location.href = "htmls/home.html";
        // case we cant use local storage
      } else {
        alert("Soory, your browser dose not support web storage");
        return;
      }
    })

    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (
        errorMessage ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        alert("user dos not exsit");
        $("#username").val("");
        $("#password").val("");
        return;
      }

      // case exsist
      else {
        alert("email or password incorrect");
      }

      // ...
    });
}

/*----------------------------------------
                    check session
    ------------------------------------------*/
function checkSession() {
  const now = new Date().toUTCString();
  const expiration = sessionStorage.getItem("expiration");
  //case session expired remove data of user
  if ((expiration && now > expiration) || expiration == null) {
    // The item has expired, so remove it
    sessionStorage.removeItem("expiration");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("p");
  }

  // case not expired session
  else {
    window.location.href = "htmls/home.html";
  }
}

/*----------------------------------------
                  forgot password
    ------------------------------------------*/
function forgotPassword() {
  var userEmail = document.getElementById("username").value;

  if (userEmail == "") alert("please enter an email");
  else {
    firebase.auth().sendPasswordResetEmail(userEmail);
    $("#username").val("");
    alert("email was sent");
  }
}

/*----------------------------------------
                        logout
    ------------------------------------------*/
function logout() {
  sessionStorage.removeItem("expiration");
  localStorage.removeItem("userID");
  localStorage.removeItem("email");
  localStorage.removeItem("p");
  window.location.href = "../index.html";
}

/*----------------------------------------------------------------my profile ------------------------------------------------------------------------------------------------*/

function showProfileDetails() {
  const usersRef = firebase.database().ref("users");
  const userRef = usersRef.child(localStorage.getItem("userID"));
  userRef.once("value").then((snapshot) => {
    const firstName = snapshot.val().first_name;
    const lastName = snapshot.val().last_name;
    const email = snapshot.val().email;
    const phone = snapshot.val().phone;
    const rate = snapshot.val().rate;
    const imageUrl = snapshot.val().image_url;

    if (imageUrl == "") {
      imageUrl = "../images/logo.png";
    }

    let profileImageStr = `<img src="${imageUrl}" alt="${firstName}" />`;
    let hiUserStr = `<h4 class="name">Hi, ${firstName}!</h4>`;
    let profileStr = `<li>
                <h6>First Name :</h6>
                <span>${firstName}</span>
              </li>
              <li>
                <h6>Last Name :</h6>
                <span>${lastName}</span>
              </li>
              <li>
                <h6>Email:</h6>
                <span>${email}</span>
              </li>
              <li>
                <h6>Phone :</h6>
                <span>${phone}</span>
              </li>
              <li>
                <h6>Rate :</h6>
                <span>${rate}</span>
              </li>`;
    $(".account-img").append(profileImageStr);
    $("#hi_user").append(hiUserStr);
    $(".db-profile-info").append(profileStr);
  });
}

/*----------------------------------------------------------------edit profile ------------------------------------------------------------------------------------------------*/

function editProfile() {
  // upload image
  const storage = firebase.storage();
  // Get a reference to the file that you want to upload
  const file = document.getElementById("photo-upload").files[0];
  //check if user select image
  if (file != undefined) {
    // Get a reference to the location in Firebase Storage where you want to upload the file
    const storageRef = storage
      .ref()
      .child("profile images/" + localStorage.getItem("userID") + ".png");

    // Upload the file to Firebase Storage
    const uploadTask = storageRef.put(file);

    // Monitor the progress of the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress updates
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle errors
        console.error("Error uploading file:", error);
      },
      () => {
        // Handle successful uploads
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          const ref = database.ref("users/" + localStorage.getItem("userID"));
          ref.update({
            image_url: downloadURL,
          });
        });
      }
    );
  }

  const database = firebase.database();
  // Get a reference to the node you want to update
  const ref = database.ref("users/" + localStorage.getItem("userID"));
  var name = document.getElementById("edit_first_name").value;
  var lastName = document.getElementById("edit_last_name").value;
  var email = document.getElementById("edit_email").value;
  var phone = document.getElementById("edit_phone").value;

  var password = document.getElementById("edit_password").value;
  var password2 = document.getElementById("edit_confirm_password").value;
  if (password == password2 && password != "") {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        localStorage.getItem("email"),
        localStorage.getItem("p")
      )
      .then(function (userCredential) {
        userCredential.user.updatePassword(password);
      });
  } else if (password != password2) {
    alert("passwords are not much");
    $("#edit_first_name").val("");
    $("#edit_last_name").val("");
    $("#edit_email").val("");
    $("#edit_phone").val("");
    $("#edit_password").val("");
    $("#edit_confirm_password").val("");
    return;
  }

  if (name == "") {
    name = "user";
  }

  if (lastName == "") {
    lastName = "user";
  }

  if (email == "") {
    email = localStorage.getItem("email");
  } else if (email != "") {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        localStorage.getItem("email"),
        localStorage.getItem("p")
      )
      .then(function (userCredential) {
        userCredential.user.updateEmail(email);
      });
  }

  if (phone == "") {
    phone = "000-000000000";
  }

  // Update user data
  ref.update({
    first_name: name,
    last_name: lastName,
    email: email,
    phone: phone,
  });
}

/*----------------------------------------------------------------add listing ------------------------------------------------------------------------------------------------*/

function addListing() {
  const usersRef = firebase.database().ref("users");
  const userRef = usersRef.child(localStorage.getItem("userID"));
  userRef.once("value").then((snapshot) => {
    const email = snapshot.val().email;
    const rate = snapshot.val().rate;
    const review = snapshot.val().review;

    var title = document.getElementById("listingTitle").value;
    var location = document.getElementById("address").value;
    var phone = document.getElementById("add_listing_phone").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("list_info").value;

    // get latitude and longitude
    location = location.replace(" ", "%20");
    var url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
      location;
    console.log(url);
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    const lat = JSON.parse(xmlHttp.responseText)[0].lat;
    const lon = JSON.parse(xmlHttp.responseText)[0].lon;

    location = location.replace("%20", " ");

    const userData = {
      type_point: title,
      phone: phone,
      location_latitude: lat,
      location_longitude: lon,
      map_image_url: "../images/marker.png",
      rate: rate,
      review: review,
      email: email,
      location: location,
      price: price,
      description: description,
    };

    // create listing on database
    firebase
      .database()
      .ref("listings/" + localStorage.getItem("userID"))
      .set(userData);
  });
}
