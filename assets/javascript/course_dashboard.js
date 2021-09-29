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


let userDetails1;
let uid;


getUserDetailsFromLStorage();

function getUserDetailsFromLStorage() {
    const currUserDetails = window.localStorage.getItem("UserDetails");
    userDetails1 = JSON.parse(currUserDetails);
    const currUserUid = window.localStorage.getItem("User_ID");
    uid = JSON.parse(currUserUid)
    // console.log("Local Storage :");
    // console.log("userDetailsG :");
    // console.log(userDetailsG);
}

console.log("userdetails " + userDetails1);


// console.log(uid)
firstName = userDetails1.userFirstName;
//console.log("firstName " + firstName);
lastName = userDetails1.userLastName;
//console.log("lastName " + lastName);
display = document.getElementById('studentName')
display.textContent = firstName;
display1 = document.getElementById('studentName_1');
display1.textContent = lastName;



document.addEventListener('DOMContentLoaded', function () {
    courseName();
    courseTerm();
    courseTopic();
    course_ID();
    teacherDetails();
    // performanceChart()
    // assignmentDetails();
});

function courseName() {
    var urlParams = new URLSearchParams(window.location.search);
    // console.log(new URLSearchParams(window.location.search));
    // console.log(urlParams.get('course')); // should return value of the course_name param

    courseIdCode = urlParams.get('courseID');;
    //    console.log(courseIdCode)
    document.getElementById('courseName').innerHTML = urlParams.get('course');
}

function courseTerm() {
    var urlParams = new URLSearchParams(window.location.search);
    //console.log(urlParams.get('courseterm')); // should return value of the course_term param

    document.getElementById('courseTerm').innerHTML = urlParams.get('courseterm');

}

function course_ID() {
    var urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.get('courseID')); // should return value of the course_code param

    document.getElementById('course_id').innerHTML = urlParams.get('courseID');

}


let courseIdCode;
let courseIDUsersG;
let teacher;
let allUsers;
let user_teacher;
var urlParams = new URLSearchParams(window.location.search);

function teacherDetails() {

    courseIdCode = urlParams.get('courseID');;
    //console.log(courseIdCode)
    // ---- Step :- Verify that 'courseIdCode' is valid --------
    firebase.database().ref('course').once('value')
        .then((snapshot) => {


            // updating the global variable to hold list of users enrolled for courseIdCode
            courseIDUsersG = snapshot.child(courseIdCode).child("userIDs").val();
            console.log(courseIDUsersG)


            firebase.database().ref('user').once('value').then((snapshot) => {
                allUsers = (snapshot.val());
                // console.log(allUsers)
                snapshot.forEach(function (childSnapshot) {
                    var key_user1 = childSnapshot.key;
                    var key_user2 = childSnapshot.val();
                    var courseusertype = key_user2.userType;
                    // console.log(courseusertype)
                    // console.log(key_user2);
                    // console.log(key_user1);
                    let courseIDLst = key_user2.courseIDs;
                    //console.log(courseIDLst)

                    for (var i = 0; i < courseIDLst.length; i++) {
                        IndCourseIDLst = courseIDLst[i]
                         console.log(IndCourseIDLst);//will give all the users
                    }

                    // for (all_user in key_user2) {
                    if (courseusertype == "teacher" && IndCourseIDLst == courseIdCode) {
                        teacherName = `${key_user2.userFirstName} ${key_user2.userLastName}`
                        teacherEmail = key_user2.userEmail;
                        teacherPhoneNum = key_user2.userPhoneNumber;
                        // console.log(teacherPhoneNum)
                        // console.log(teacherName)
                        // console.log(teacherEmail)
                        // console.log(all_user)
                        document.getElementById("teacherDetails").innerHTML += `                             
                                <div id= 'teacherDetails'>
                                    <h6 class="padding_3 pb-6 pt-6">Name:   ${teacherName}</h6>
                                    <p class="padding_3 pb-6 pt-6 font-italic">Email:   ${teacherEmail}</p>
                                    
                                </div>
                                    
                        `
                        // }
                    }

                })
            })
        })
    return courseIdCode;
}


function courseTopic() {
    // courseTopicID for a particular courseID in an array
    firebase.database().ref('course').child(courseIdCode).child('courseTopic').once('value').then((snapshot) => {
        courseTopics = (snapshot.val());
        // console.log(courseTopics)


        // to get all courseIDs available under the course topic node, returns as an object
        firebase.database().ref('courseTopic').once('value').then((snapshot) => {
            course_Topic = (snapshot.val());
            //console.log(course_Topic)

            snapshot.forEach(function (childSnapshot) {
                var key1 = childSnapshot.key;
                var key2 = childSnapshot.val();
                // console.log(key2)
                // console.log(key1);

                courseTopics.forEach(element => {
                    if (key1 === element) {
                        course_topicName = key2.courseTopicName
                        //console.log(course_topicName);

                        document.getElementById("courseTopics").innerHTML += `                                
                                
                                <li id = 'courseTopics' >${course_topicName}</li>
                                        
                            `
                    }
                })

            })

        })
    })
}



let assID;
var assIDKey;
var reqAssID;
var assSubIsGraded;
var assSubIsReturned;
let assSubuserID;
let assSubIDKey;
let assSubIDValue;
//let assTotalScore;
//let assignID
let assignIDKey
let assignIDValue
let assignIDDetailsID

// let usesrAssignmentList = [];
let usersAsgmtFinalList = [];

let student_Goal;
//  function to get student goal(target grade)
function performanceChart() {
    console.log("inside performance");
    studentCourseDetailsID = userDetails1.studentCourseDetailsIDs;
    console.log("courseDetailsID " + studentCourseDetailsID);

    firebase.database().ref('studentCourseDetails').once('value')
        .then((snapshot) => {
            course_DetailsID = (snapshot.val())
            console.log(course_DetailsID)

            snapshot.forEach(function (childSnapshot) {
                course_DetailsIDKey = childSnapshot.key;
                course_DetailsIDValue = childSnapshot.val();
                console.log(course_DetailsIDKey);
                console.log(course_DetailsIDValue);


                studentCourseDetailsID.forEach(element => {

                    if (course_DetailsIDKey === element && course_DetailsIDValue.courseIDs === courseIdCode) {
                        student_Goal = course_DetailsIDValue.studentGoal
                        console.log(student_Goal);

                        // return(student_Goal);
                    }

                })

                //console.log(student_Goal);

            }) // foreach
            console.log(student_Goal)
            console.log("inside performance .. end");
        }).then(() => {
            Grade()
        }).then(() => {
            potentialGrade()
        })


}
performanceChart();


let ass_subGradingEventID
let latestGradingEventID
let ass_subID
let ass_Score
let ass_detailsPoints
let ass_Points
let ass_Id

let gradeCategoryId
let ass_Titles
let ass_detailsID

ass_subID = []
ass_detailsID = []
gradeCategoryId = []
ass_Points = []
ass_Titles = []
let point_assign
let title_assign
let ass_Type
let categoryName
let categoryWeights = []

function assignmentSubmission() {
    console.log("start assignmentSubmission")
    firebase.database().ref('assignmentSubmission').once('value')
        .then((snapshot) => {
            assignment_submission = (snapshot.val())
            console.log(assignment_submission)
            snapshot.forEach(function (childSnapshot) {
                assignment_submissionKey = childSnapshot.key;
                assignment_submissionValue = childSnapshot.val();
                console.log(assignment_submissionKey);
                console.log(assignment_submissionValue);
                // ass_subID = assignment_submissionValue.assignmentID
                // console.log(ass_subID);
                ass_subIsGraded = assignment_submissionValue.isGraded
                console.log(ass_subIsGraded);
                ass_subIsReturned = assignment_submissionValue.isReturned
                console.log(ass_subIsReturned);
                ass_subCourseID = assignment_submissionValue.courseID
                console.log(ass_subCourseID);
                ass_subUserID = assignment_submissionValue.userID
                console.log(ass_subUserID);
                // ass_subGradingEventID = assignment_submissionValue.assignmentGradingEventIDs
                // console.log(ass_subGradingEventID);
                // })
                if (ass_subIsGraded && ass_subIsReturned && ass_subCourseID === courseIdCode && ass_subUserID === uid) {
                    assid = assignment_submissionValue.assignmentID;
                    ass_subID.push(assid)
                    // ass_subID = assignment_submissionValue.assignmentID;
                    console.log(ass_subID)
                    // return ass_subID
                    ass_subGradingEventID = assignment_submissionValue.assignmentGradingEventIDs
                    console.log(ass_subGradingEventID);
                    latestGradingEventID = ass_subGradingEventID[ass_subGradingEventID.length - 1]
                    console.log(latestGradingEventID)
                }
                

            })


        })


    console.log("end assignmentSubmission")
}
assignmentSubmission()

function assignmentGradingEvent() {
    console.log("start assignmentGradingEvent")
    firebase.database().ref('assignmentGradingEvent').once('value')
        .then((snapshot) => {
            ass_GradeEvent = (snapshot.val())
            console.log(ass_GradeEvent)


            snapshot.forEach(function (childSnapshot) {
                ass_GradeEventKey = childSnapshot.key;
                ass_GradeEventValue = childSnapshot.val();
                console.log(ass_GradeEventKey);
                console.log(ass_GradeEventValue);




                if (ass_GradeEventKey === latestGradingEventID) {
                    ass_Score = ass_GradeEventValue.score
                    console.log(ass_Score);


                } else {
                    console.log("no grading event match available")
                }




            })


        }).then(() => {
            updateAssignment()
        }).then(() => {
            actualGrade()
        })
    console.log("end assignmentGradingEvent")
}
assignmentGradingEvent()

function assignment() {
    console.log("inside assignment")
    firebase.database().ref('assignment').once('value')
        .then((snapshot) => {
            ass_Id = (snapshot.val())
            console.log(ass_Id)


            snapshot.forEach(function (childSnapshot) {
                ass_IdKey = childSnapshot.key;
                ass_IdValue = childSnapshot.val();
                console.log(ass_IdKey);
                console.log(ass_IdValue);
                console.log(ass_Score);
                console.log(ass_subID);



                for (i = 0; i < ass_subID.length; i++) {
                    if (ass_IdKey === ass_subID[i]) {
                        assdetailsID = ass_IdValue.assignmentDetailsID
                        ass_detailsID.push(assdetailsID)
                        console.log(ass_detailsID);

                        assPoints = ass_IdValue.assignmentPoints
                        ass_Points.push(assPoints)
                        console.log(ass_Points);
                        assTitles = ass_IdValue.assignmentTitle
                        ass_Titles.push(assTitles)
                        console.log(ass_Titles);


                    } else {
                        console.log("no grading event match available")
                    }

                }


            })

        }).then(() => {
            updateAssignment()
        })
    console.log("end assignment")
}

assignment()
console.log(ass_Titles);

function assignmentDetailsID() {
    console.log("inside assignmentDetailsID")
    firebase.database().ref('assignmentDetails').once('value')
        .then((snapshot) => {
            ass_detailsInfo = (snapshot.val())
            console.log(ass_detailsInfo)


            snapshot.forEach(function (childSnapshot) {
                ass_detailsInfoKey = childSnapshot.key;
                ass_detailsInfoValue = childSnapshot.val();
                console.log(ass_detailsInfoKey);
                console.log(ass_detailsInfoValue);


                for (i = 0; i < ass_detailsID.length; i++) {
                    if (ass_detailsInfoKey === ass_detailsID[i]) {
                        grade_Cat = ass_detailsInfoValue.gradeCategoryID
                        gradeCategoryId.push(grade_Cat)
                        console.log(gradeCategoryId);


                    } else {
                        console.log("no grading category match available")
                    }

                }

            })

        })
    console.log("end assignmentDetailsID")

}
assignmentDetailsID()


function grade_Category() {
    console.log("inside grade_Category")
    firebase.database().ref('gradeCategory').once('value')
        .then((snapshot) => {
            gradeCategoryInfo = (snapshot.val())
            console.log(gradeCategoryInfo)


            snapshot.forEach(function (childSnapshot) {
                gradeCategoryInfoKey = childSnapshot.key;
                gradeCategoryInfoValue = childSnapshot.val();
                console.log(gradeCategoryInfoKey);
                console.log(gradeCategoryInfoValue);
                categoryName = gradeCategoryInfoValue.categoryName
                console.log(categoryName)



                for (i = 0; i < gradeCategoryId.length; i++) {
                    if (gradeCategoryInfoKey === gradeCategoryId[i] && categoryName === "Assignment") {
                        cat_weights = gradeCategoryInfoValue.categoryWeights
                        categoryWeights.push(cat_weights)
                        console.log(categoryWeights);

                    } else {
                        console.log("no category weight match available")
                    }

                }


            })

        }).then(() => {
            actualGrade()
        }).then(() => {
            potentialGrade()
        })
    console.log("end grade_Category")
}
grade_Category()
console.log(actual_Grade)
var actual_Grade = 0
var gradeCalc
var sum
function actualGrade() {
    console.log("start actualGrade")
    for (i = 0; i < categoryWeights.length; i++) {
        category = categoryWeights[i]
        console.log(category)
        sum = categoryWeights.reduce(function (a, b) {
            return a + b;
        }, 0);
        console.log(sum)
        for (i = 0; i < ass_Points.length; i++) {
            point = ass_Points[i]
            console.log(point)

            gradeCalc = ((ass_Score / point) * 100 * categoryWeights[i])


            actual_Grade += gradeCalc
        }

        console.log(categoryWeights);
        console.log(ass_Score);
        console.log(gradeCalc);
        console.log(actual_Grade);
        console.log("end actualGrade")
        Grade()
    }
}
actualGrade()

let totalWeight = 1
let weight
let requiredGrade
let currentGrade
let potential_Grade
function potentialGrade() {
    currentGrade = actual_Grade,
        requiredGrade = student_Goal


     potential_Grade = (requiredGrade - (totalWeight - categoryWeights[0]) * (currentGrade/categoryWeights[0])) / categoryWeights[0]
    if (potential_Grade < 0) {

        potential_Grade = 0

    } else {
        potential_Grade 


    }
    console.log(categoryWeights[0])
    console.log(totalWeight)
    console.log(weight)
    console.log(requiredGrade)
    console.log(potential_Grade)
    Grade()
}

// potentialGrade()


function Grade() {
    console.log("inside grade");
    var xValues = ["Target Grade", "Potential Grade", "Actual Grade"];
    console.log(actual_Grade)
    var yValues = [`${student_Goal}`, `${potential_Grade}`, `${actual_Grade}`, 0];
    var barColors = ["blue", "grey", "purple", "orange"];

    new Chart("performanceChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Performance(%)"
            }
        }
    });
    console.log(student_Goal);
    console.log("grade end");
}

function updateAssignment() {
    console.log("start update Assignment")
    for (i = 0; i < ass_Titles.length; i++) {

        title_assign = ass_Titles[i]
        for (i = 0; i < ass_Points.length; i++) {
            point = ass_Points[i]
            console.log(point)

     }

        document.getElementById("assignmentScoring").innerHTML += `                                
    
      
        <li id = 'assignmentScoring' >${title_assign}- <span> ${ass_Score}</span></li>

         
       `
    }

    console.log("end update Assignment")
}