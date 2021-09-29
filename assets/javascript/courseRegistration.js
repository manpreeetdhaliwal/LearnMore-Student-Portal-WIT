let uid;
let userDetailsG;
let courseUsersG;
//By Elham, to capture the current course ID for course goal
let courseID;
let joinCode;
​
joinButton = document.getElementById('joinButton')
joinButton.addEventListener('click', joinClass);
​
​
function displayUserName() {
    const firstName = userDetailsG.userFirstName;
    const lastName = userDetailsG.userLastName;
    //     display = document.getElementById('studentName')
    //     display.textContent = firstName;
    //     display1 = document.getElementById('studentName_1');
    //     display1.textContent = lastName;
}
​
​
function getUserDetailsFromLStorage() {
    const currUserDetails = window.localStorage.getItem("UserDetails");
    userDetailsG = JSON.parse(currUserDetails);
    const currUserUid = window.localStorage.getItem("User_ID");
    uid = JSON.parse(currUserUid);
​
}
​
​
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
​
​
​
function getCurrentCourses(courseCode) {
    let existingCourses = userDetailsG.courseIDs;
    console.log(existingCourses);
    let newCourseList = [];
    if (existingCourses == "" || existingCourses == undefined) {
        newCourseList.push(courseCode); // user was not registered to any course .. this is the first course
    }
    else { // user is already registered to some courses
​
        if (Object.values(existingCourses).includes(courseCode)) {
            console.log("user is already registered");
            throw ("User is already registerd to course")
        }
        else {
            newCourseList = existingCourses;
            newCourseList.push(courseCode);
        }
    }
    return newCourseList;
}
​
async function joinClass() {
​
    try {
        joinCode = `courseID_${document.getElementById('CourseCodeInput').value}`;
        //By Elham, to capture the current course ID for course goal
        courseID = joinCode;
​
        let courseRef = firebase.database().ref('course');
        const snapshot = await courseRef.once('value');
        const value = snapshot.val();
        console.log(value)
        // ---- Step :- Verify that 'joinCode' is valid --------
        const isValidCourse = await snapshot.child(joinCode).exists();
        if (!isValidCourse) {
            throw ("Invalid course");
            
        }
        // ------ Step :-  joinCode is valid , so add joinCode to current user
        let newCourseList = getCurrentCourses(joinCode);
​
        const userRef = firebase.database().ref().child("user").child(uid)
        const userIsUpdated = await userRef.update({ courseIDs: newCourseList });
        console.log("User Updated");
        //     // ------ Step :- Since user data is updated with joinCode, get updated user snapshot
        const userSnapshot = await userRef.once('value');
        const updatedUserNode = userSnapshot.val();
        console.log(updatedUserNode);
        window.localStorage.setItem("UserDetails", JSON.stringify(updatedUserdetails));
        getUserDetailsFromLStorage();
​
        //     // ------Step :-  Update courses Node ----
        // get the updated list of currentUsers            
        let newUserList = updateUsersList();
​
​
        const courseSnapshot = await courseRef.child(joinCode).update({ userIDs: newUserList })
        console.log("Courses node updated")
        alert("You have succesfully registered")
        window.location.href = "studentGoal.html";
    }
    catch (err) {
        alert(err)
    }
​
​
}
​
​
​
​
​
// ----------- Main functionality ----------
​
​
​
​
getUserDetailsFromLStorage();
​
console.log("userdetails :");
console.log(userDetailsG);
console.log("uid : " + uid);
​
displayUserName();
​
​