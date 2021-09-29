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

// Working code to display logged in user



let uid;
let userDetailsG;
let courseUsersG;
//By Elham, to capture the current course ID for course goal
let courseID;

joinButton = document.getElementById('joinButton')
joinButton.addEventListener('click', joinClass);


getUserDetailsFromLStorage();

console.log("userdetails :");
console.log(userDetailsG);
console.log("uid : " + uid);

displayUserName();

function displayUserName() {
    const firstName = userDetailsG.userFirstName;
    const lastName = userDetailsG.userLastName;
    display = document.getElementById('userFirstName')
    display.textContent = firstName;
    display1 = document.getElementById('userLastName');
    display1.textContent = lastName;
}


function getUserDetailsFromLStorage() {
    const currUserDetails = window.localStorage.getItem("UserDetails");
    userDetailsG = JSON.parse(currUserDetails);
    const currUserUid = window.localStorage.getItem("User_ID");
    uid = JSON.parse(currUserUid);
    console.log("Local Storage :");
    console.log("userDetailsG :");
    console.log(userDetailsG);
}


function joinClass() {
    let joinCode = `courseID_${document.getElementById('CourseCodeInput').value}`;
    //By Elham, to capture the current course ID for course goal
    courseID = joinCode;
    // ---- Step :- Verify that 'joinCode' is valid --------
    firebase.database().ref('course').once('value')
        .then((snapshot) => {
            let joinCodeExist = snapshot.child(joinCode).exists();
            //console.log("a : " + a);
            if (joinCodeExist)  // joinCode is valid
            {
                //console.log("Valid Course");
                // updating the global variable to hold list of users enrolled for course joinCode
                courseUsersG = snapshot.child(joinCode).child("userIDs").val();
            }
            else {
                //console.log("invalid course")

                throw "invalid course";
            }
        })
        .then((snapshot) => {
            // ------ Step :-  joinCode is valid , so add joinCode to current user

            let newCourseList = getCurrentCourses(joinCode);
            //console.log("Courses now are " + newCourseList);

            // update firebase db with new course list
            firebase.database().ref().child("user").child(uid)
                .update({ courseIDs: newCourseList })
            console.log("USer Node updated");

        }).then(() => {
        // ------ Step :- Since user data is updated with joinCode, get updated user snapshot

        return firebase.database().ref('/user/' + uid).once('value')
            .then((snapshot) => {
                let updatedUserdetails = (snapshot.val());
                window.localStorage.setItem("UserDetails", JSON.stringify(updatedUserdetails));
                getUserDetailsFromLStorage();

                //console.log("Local storage updated")
            })

            

    }).then(() => {
        // ------Step :-  Update courses Node ----

        // get the updated list of currentUsers
        let newUserList = updateUsersList();
        //console.log("newUserList");
        //console.log(newUserList);
        // update firebase db with new users list

        firebase.database().ref().child("course").child(joinCode)
            .update({ userIDs: newUserList })
        console.log("Courses node updated")

    }).then ( () => {
        alert("You have succesfully registered")
        ////By Elham, to capture the current course ID for course goal
        window.localStorage.setItem("latest_added_course", courseID)
        window.location.href = "studentGoal.html";
        // raise your alert
        // change your page
        // code is for the student dashboard page
    })
        .catch((error) => {
            console.log("Error : " + error);
            alert(error)
        })
}


function updateUsersList() {
    let newUserList = [];
    console.log("courseUsers : " + courseUsersG);
    if (courseUsersG == undefined || courseUsersG == "") {
        newUserList = newUserList.push(uid);
    } else {
        let currentCourses = Object.values(courseUsersG);
        if (currentCourses.includes(uid)) {
            console.log("user is already added to the course");
            newUserList = currentCourses;
        }
        else {
            currentCourses.push(uid);
            newUserList = currentCourses;
        }
    }
    return newUserList;
}




function getCurrentCourses(CourseCodeInput) {
    let existingCourses = userDetailsG.courseIDs;
    console.log(existingCourses);
    let newCourseList = [];
    if (existingCourses == "" || existingCourses == undefined) {
        newCourseList.push(CourseCodeInput); // user was not registered to any course .. this is the first course
    }
    else { // user is already registered to some courses

        if (Object.values(existingCourses).includes(CourseCodeInput)) {

            console.log("user is already registered");
            throw ("User is already registerd to course")
        }
        else {
            newCourseList = existingCourses;
            newCourseList.push(CourseCodeInput);
        }
    }
    return newCourseList;
}