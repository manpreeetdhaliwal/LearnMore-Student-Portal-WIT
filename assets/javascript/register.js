
// Get DOM elements
formName = document.getElementById('registerForm');
const btnregister = document.getElementById('btnRegister');
const firstNameHandle = document.getElementById('firstName');
const lastNameHandle = document.getElementById('lastName');
const emailHandle = document.getElementById('email');
const passwordHandle = document.getElementById('password');
const confirmPasswordHandle = document.getElementById('confirmPassword');
const roleHandle = document.getElementById('userRole');

const database = firebase.database();
var ref = firebase.database().ref("user");

var uid;
var currUserRole;
var lastName;
var firstName;

hideFormErrorMsgs();

// Add login event
btnregister.addEventListener('click', e => {
    e.preventDefault();
    hideFormErrorMsgs();

    // read values on button click
    firstName = firstNameHandle.value;
    const lastName = lastNameHandle.value;
    const email = emailHandle.value;
    const password = passwordHandle.value;
    const confirmPassword = confirmPasswordHandle.value;
    currUserRole = roleHandle.value;

    console.log(email, password);

    var isFormValid = validateRegisterForm(firstName, lastName, email, password, confirmPassword, currUserRole);

    if (!isFormValid) {
        console.log("invalid form");
        return;
    }

    // Sign in
    auth.createUserWithEmailAndPassword(email, password)
        .then((credential) => {
            uid = credential.user.uid;
            uid = "userID_" + uid
            console.log("uid", uid);
            console.log("role", currUserRole);

            var addNode = {
                // role: currUserRole,                
                userType: currUserRole,
                userFirstName: firstName,
                userLastName: lastName,
                userEmail: email,
                courseIDs:""

            };


            var ref2 = ref.child(uid);
            ref2.set(addNode);
            console.log("ref2 is " + ref2);

          

        }).catch((error) => {
            
            document.getElementById("registerForm").reset();
            if (error.code == "auth/email-already-in-use") {
                alert("This email is already in use. Please use a different email address.");                
            }
            console.log("error", error);
        })

});

auth.onAuthStateChanged(function (user) {
    if (user) {
        
        console.log("user id : " + uid);
        // get user role from database using uid
    
    
        return firebase.database().ref('user/' + uid).once('value')
          .then((snapshot) => {
   
            const userdetails = snapshot.val();
            window.localStorage.setItem("UserDetails", JSON.stringify(userdetails));
            window.localStorage.setItem("User_ID" , JSON.stringify(uid));
        
            if (currUserRole == "teacher") {
                window.location.href = "main_teacher.html";

            } else if (currUserRole == "student") {
                window.location.href = "course_registration.html";
            } else {
                window.location.href = "index.html";
            }
        })
    }
});




