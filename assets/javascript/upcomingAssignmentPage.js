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

let userDetails = window.localStorage.getItem("UserDetails");
userDetails = JSON.parse(userDetails);
let uid = window.localStorage.getItem("User_ID");
uid = JSON.parse(uid);

// console.log(userDetails)
// console.log(uid)
// console.log("userdetails " +  Object.keys(userDetails));


const firstName = userDetails.userFirstName;
// console.log("firstName " + firstName);
const lastName = userDetails.userLastName;
// console.log("lastName " + lastName);
const registeredCoursesList = userDetails.courseIDs;
// console.log(courseID)
display = document.getElementById('userFirstName')
display.textContent = firstName;
display1 = document.getElementById('userLastName');
display1.textContent = lastName;



document.addEventListener('DOMContentLoaded', function () {
    // displayCoursesList();
    mainFunction();
    
});



let db = firebase.database();
let allAssignmentsList = []; 
let allAssignmentsObjects = {};     // this will hold details of assigments as objects with assignmentID as key
//console.log(registeredCoursesList)
let allCoursesObjects = {};



//async function 
async function getAssignmentDetails(){
    const assignmentDbRef = db.ref('assignment');
    const assignmentDetailsRef = db.ref('assignmentDetails');
    console.log( "*** start");
    for (const [courseIdKey, courseDetails] of Object.entries(allCoursesObjects)) {
        console.log("**** First for satrt");
       // console.log(`${courseIdKey}: ${courseDetails}`);
        currAssignmentIdsList = courseDetails.AssignmentID;
        currCourseN = courseDetails.CourseName
        console.log(currAssignmentIdsList);
        console.log(courseIdKey)
        console.log(courseDetails)

        for( i=0; i<currAssignmentIdsList.length ; i++ ){
            console.log(" ----- second for starts");
            currassignmentID = currAssignmentIdsList[i];            
            allAssignmentsObjects[currassignmentID]= {};
            const snapshot = await assignmentDbRef.child(currassignmentID).once("value");
            const currAssignmentInfo = snapshot.val();
            const assignemntTitle = currAssignmentInfo.assignmentTitle;
            const assignmentPoints = currAssignmentInfo.assignmentPoints
            const assignmentDetailsID = currAssignmentInfo.assignmentDetailsID;

            const detailsSnapshot = await assignmentDetailsRef.child(assignmentDetailsID).once("value");
            const assignmentDetails = detailsSnapshot.val();
            const assignmentDuedate = assignmentDetails.assignmentDuedate;
            const assignmentType = assignmentDetails.assignmentType;
            
            allAssignmentsObjects[currassignmentID]["CourseID"] = courseIdKey
            allAssignmentsObjects[currassignmentID]["AssignmentID"] = currassignmentID
            allAssignmentsObjects[currassignmentID]["CourseName"] = currCourseN
            allAssignmentsObjects[currassignmentID]["Title"] = assignemntTitle;
            allAssignmentsObjects[currassignmentID]["DueDate"] = assignmentDuedate;
            allAssignmentsObjects[currassignmentID]["Type"] = assignmentType;
            allAssignmentsObjects[currassignmentID]["Points"] = assignmentPoints;
            allAssignmentsObjects[currassignmentID]["AssignmentDetailsId"] = assignmentDetailsID
            console.log(allAssignmentsObjects[currassignmentID]);
            console.log("assignmentDuedate" + assignmentDuedate);
            
            
             
        
            
        }
        console.log("second for ends");      
        
      }
      console.log("first for ends");
console.log(allAssignmentsObjects);

}

async function displayAllAssignments(){
    console.log(allAssignmentsObjects);
    console.log(allCoursesObjects)

   
    
    for (const [courseIdKey, courseDetail] of Object.entries(allAssignmentsObjects)) {
        // for (const [courseIdKey, courseDetails] of Object.entries(allCoursesObjects)) {
        //     currAssignmentIdsList = courseDetails.AssignmentID;
        //     console.log(currAssignmentIdsList)
        //     currCourseName = courseDetails.CourseName
        //     console.log(currAssignmentIdsList);
        //     console.log(currCourseName)
       // console.log(`${courseIdKey}: ${courseDetails}`);
            currDueDate = courseDetail.DueDate;
            currTitle = courseDetail.Title;
            currType = courseDetail.Type;
            currName = courseDetail.CourseName
            currPoint = courseDetail.Points
            currAssignmentDetails = courseDetail.AssignmentDetailsId

            console.log(currDueDate)

            if(currType == "assignment"){

            document.getElementById("allCourses").innerHTML += ` 
                <h5 id = "courseName">${currName}</h5>
                <a href="assignment_submission.html?courseName=${currName}&courseDuedate=${currDueDate}&courseType=${currType}&coursePoint=${currPoint}&courseTitle=${currTitle}&courseAssignmentDetailsId=${currAssignmentDetails}">
                <ul class= 'assignmentLists'>
                    <li>Assignment Title: ${currTitle}</li></a>
                    <h6 class="assignmentType">Assignment type: ${currType}</h6>
                    <h6 class= "duedate">Due on: ${currDueDate}</h6>
                </ul>
                
            `
            }else{
                document.getElementById("allCourses").innerHTML += ` 
                    <h5 id = "courseName">${currName}</h5>
                    <a href="quiz_submission.html?courseName=${currName}&courseDuedate=${currDueDate}&courseType=${currType}&coursePoint=${currPoint}&courseTitle=${currTitle}&courseAssignmentDetailsId=${currAssignmentDetails}">
                    <ul class= 'assignmentLists'>
                        <li>Assignment Title: ${currTitle}</li></a>
                        <h6 class="assignmentType">Assignment type: ${currType}</h6>
                        <h6 class= "duedate">Due on: ${currDueDate}</h6>
                    </ul>
                
            `
            }
        // }
    }
    
    // courseName = allCoursesObjects[currCourseID]
    // console.log(courseName)
    // assignmentTitle = allAssignmentsObjects[currassignmentID]["Title"]
    assignmentTitle = allAssignmentsObjects[currassignmentID]["Title"]

    console.log(assignmentTitle)
    // for (const [courseIdKey, courseDetails] of Object.entries(allCoursesObjects)) {
    //     console.log("**** First for satrt");
    //    // console.log(`${courseIdKey}: ${courseDetails}`);
    //     currAssignmentIdsList = courseDetails.AssignmentID;
    //     console.log(currAssignmentIdsList)
    //     currCourseName = courseDetails.CourseName
    //     console.log(currAssignmentIdsList);
    //     console.log(currCourseName)

    //     document.getElementById("allCourses").innerHTML += ` 
    //             <h5 id = "courseName">${currCourseName}</h5>                                  
    //     `

    //     for(element in allAssignmentsObjects){
    //         for(item in allCoursesObjects){
    //             console.log(element)
    //             console.log(item)
    //             if(element == item){
    //                 assignmentTitle = allAssignmentsObjects[currassignmentID]["Title"]
    //                 console.log(assignmentTitle)
    //             }
    //         }
    //     }
    //     // currAssignmentIdsList.forEach(element =>{
    //     //     console.log(element)
    //     //     if(element = )
    //     // })
    
    // }
}


async function mainFunction(){
    console.log("start");
    const a = await displayUpcomingTasks(registeredCoursesList);
    console.log("hello");
    const b = await getAssignmentDetails();
    const c = await displayAllAssignments()




}

async function displayUpcomingTasks(registeredCoursesList) {

        // *****************************
    const courseDbRef = db.ref('/course/');
    for(let index = 0; index < registeredCoursesList.length; index++){
        const currCourseID = registeredCoursesList[index]
        console.log(currCourseID)
        const currCourseSnapshot = await courseDbRef.child(currCourseID).once("value");
        const currCourseInfo = currCourseSnapshot.val();
        const currCourseName = currCourseInfo.courseName;
        const assignmentID = currCourseInfo.assignmentIDs;

        allCoursesObjects[currCourseID] = { "AssignmentID": assignmentID , "CourseName" :currCourseName  };
        console.log(allCoursesObjects)
    }   
}















