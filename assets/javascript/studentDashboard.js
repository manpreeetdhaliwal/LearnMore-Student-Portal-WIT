btnlogout = document.getElementById("btnLogout");

btnlogout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();

    auth.onAuthStateChanged(function (user) {

        if (user) {

            console.log(user);
            window.location.href = "index.html";
        } else {
            console.log("logged out");
            window.location.href = "index.html";
        }
    });
});


let userDetails;
let uid;

getUserDetailsFromLStorage();


function getUserDetailsFromLStorage() {
    const currUserDetails = window.localStorage.getItem("UserDetails");
    userDetails = JSON.parse(currUserDetails);
    const currUserUid = window.localStorage.getItem("User_ID");
    uid = JSON.parse(currUserUid);
    // console.log("Local Storage :");
    // console.log("userDetailsG :");
    // console.log(userDetailsG);
}

console.log("userdetails " + userDetails);

console.log(uid)

const firstName = userDetails.userFirstName;
console.log("firstName " + firstName);
const lastName = userDetails.userLastName;
console.log("lastName " + lastName);
display = document.getElementById('userFirstName')
display.textContent = firstName;
display1 = document.getElementById('userLastName');
display1.textContent = lastName;




// Tolu's code modified and working
document.addEventListener('DOMContentLoaded', function () {
    displayCoursesList();
});

function displayCoursesList() {

    console.log(userDetails);


    // logging the courseID_xxxx
    logIndividualCourses();
    // for (var i = 0; i < userDetails.courseIDs.length; i++) {
    //     individualCourses = userDetails.courseIDs[i]
    //     console.log(individualCourses);//will give all the elements
    // }
   
    // document.getElementById("coursecards").innerHTML = "";


    // console.log(courseName);
    // console.log(courseTerm)
    firebase.database().ref("course").once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key1 = childSnapshot.key;
                var key2 = childSnapshot.val();
                console.log(key2)
                console.log(key1);
                console.log(userDetails.courseIDs)

                userDetails.courseIDs.forEach(element => {
                    if (key1 === element) {
                        console.log(key2.courseCode);
                        console.log(element)

                        courseNames = key2.courseName;
                        console.log(courseNames);
                        courseCodes = element;
                        console.log(courseCodes);
                        courseTerms = key2.courseTerm;
                        console.log(courseTerms);
                        courseTopicIDs = key2.courseTopic
                        console.log(courseTopicIDs);
                        

                        document.getElementById("coursecards").innerHTML += ` 
                        <div class="row" id="coursecards">
                            <a href="course_dashboard.html?course=${courseNames}&courseterm=${courseTerms}&courseID=${courseCodes}&courseTopicID=${courseTopicIDs}">                               
                                <div id="${individualCourses}" class="card mt-3 ml-5 shadow mb-5 bg-white rounded-top-5 myCourseIcon" style="width: 182px; height:220px">
                                    <img src="./assets/images/open-book.jpg" class="card-img-top" alt="course background" style="width: 180px; height:130px">
                                    <div class="card-body">
                                        <h6 class="card-title"><b>${courseNames}</b></h6>
                                        <p class="card-text text-capitalize">${courseCodes}</p>                    
                                                          
                                    </div>
                                </div>   
                            </a> 
                        </div>
                        `
                    }
                })
            })
        })
}



function logIndividualCourses(){
    for (var i = 0; i < userDetails.courseIDs.length; i++) {
        individualCourses = userDetails.courseIDs[i]
        console.log(individualCourses);//will give all the elements
    }
}


















