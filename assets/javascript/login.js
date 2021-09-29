const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');

const database = firebase.database();
var ref = firebase.database().ref("user");


hideFormErrorMsgs();



// Add login event
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  hideFormErrorMsgs();
  console.log("here 3");
  // Get email and password
  const email = txtEmail.value;
  const pass = txtPassword.value;

  var isFormValid = validateLoginForm(email, pass);

  if (!isFormValid) {
    console.log("invalid form");
    //document.getElementById("regiterForm").reset();
    return;
  }


  // Sign in
  auth.signInWithEmailAndPassword(email, pass)
    .then(cred => {
      console.log("user logged in ");
    }).catch(function (error) {
      // console.log(error.message);
      // alert("Invalid login credentials. Please try again")


      if (error.code == "auth/user-not-found") {
        alert("User not found. Please register");
      }
      else if (error.code == "auth/invalid-email") {
          alert("Please enter a valid email address.");          
      }
      else if (error.code == "auth/wrong-password") {
          alert("Invalid password, please try again.");          
      }
      console.log("error", error);
    });  
}); // event listener ends

//var uid = null;

auth.onAuthStateChanged(function (user) {

  if (user) {
    // const uid = user.uid;
    uid= `userID_${user.uid}`;
    console.log("user id : " + uid);
    // get user role from database using uid


    return firebase.database().ref('user/' + uid).once('value')
      .then((snapshot) => {
        const userRole = (snapshot.val() && snapshot.val().userType) || 'Anonymous';
        console.log("user role: " + userRole);

        const userdetails = snapshot.val();
        window.localStorage.setItem("UserDetails", JSON.stringify(userdetails));
        window.localStorage.setItem("User_ID" , JSON.stringify(uid));

        // load HTML based on user role
        if (userRole == "teacher") {
          window.location.href = "main_teacher.html";

        } else if (userRole == "student") {
          window.location.href = "student_dashboard.html";
        } else {
          window.location.href = "index.html";
        }

      })
      .catch((error) => {
        console.log(error);
      })

  }
}); // auth statechange ends

//TODO: Add forgot Password logic

