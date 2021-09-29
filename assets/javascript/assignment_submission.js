let userDetails = window.localStorage.getItem("UserDetails");
let uid = window.localStorage.getItem("User_ID");
uid = JSON.parse(uid);
console.log("userdetails " + userDetails);
userDetails = JSON.parse(userDetails);
console.log(userDetails)
console.log(uid)
const firstName = userDetails.userFirstName;
console.log("firstName " + firstName);
const lastName = userDetails.userLastName;
console.log("lastName " + lastName);
display = document.getElementById('studentName')
display.textContent = firstName;
display1 = document.getElementById('studentName_1');
display1.textContent = lastName;



btnlogout = document.getElementById("btnLogout");

btnlogout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();

    auth.onAuthStateChanged(function (user) {

        if (user) {

            // console.log(user);
            window.location.href = "index.html";
            // window.location.href = "upcomingAssignmentPage.html";
        } else {
            // console.log("logged out");
            window.location.href = "index.html";
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    assignmentCourseName();
    assignmentTitle();
    assignmentPoint();
    assignmentDueDate()
});


function assignmentCourseName() {
    var urlParams = new URLSearchParams(window.location.search);
  
    document.getElementById('assignmentCourseName').innerHTML = urlParams.get('courseName');
}


function assignmentTitle() {
    var urlParams = new URLSearchParams(window.location.search);

    document.getElementById('assignmentTitle').innerHTML = urlParams.get('courseTitle');
}

function assignmentPoint() {
    var urlParams = new URLSearchParams(window.location.search);

    document.getElementById('assignmentPoint').innerHTML = urlParams.get('coursePoint');
}

function assignmentDueDate() {
    var urlParams = new URLSearchParams(window.location.search);

    document.getElementById('assignmentDuedate').innerHTML = urlParams.get('courseDuedate');
}

var urlParams = new URLSearchParams(window.location.search);
let courseAssignmentDetailsId = urlParams.get('courseAssignmentDetailsId')
console.log(courseAssignmentDetailsId)

firebase.database().ref("assignmentDetails").child(courseAssignmentDetailsId).once("value").then(function (snapshot) {
    var currsnapshot = snapshot.val();
    let assignmentInstruction= currsnapshot.assignmentInstruction

    console.log(assignmentInstruction);
    document.getElementById('assignmentInstruction').innerHTML = assignmentInstruction;

})



assignmentSub = document.getElementById("assignmentSubmit");

assignmentSub.addEventListener('click', e => {
    e.preventDefault();
    alert("You have succesfully submitted your assignment")
        ////By Elham, to capture the current course ID for course goal
        window.location.href = "#";

    
});
