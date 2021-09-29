
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










const dbRef = firebase.database().ref();
function gradeColor(grade, courseAvg) {
    if (grade >= courseAvg) {
        return "numberRoundGreen"
    } else {
        return "numberRoundRed"
    }
}

$(document).ready(
    function () {
        let logged_in = false;
        let userId = null;
        let cid_courseGrade = {}

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userId = "userID_" + user.uid;
                logged_in = true
                dbRef.child("user").child(userId).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        const record = snapshot.val()
                        console.log(record)
                        var welcome_message = `Hi ${record['userFirstName']} ${record['userLastName']}`
                        $('.greetings').text(welcome_message)
                    }
                })
                dbRef.child("user").child(userId).get().then((user) => {
                    let courseIDs = user.val()["courseIDs"]
                    console.log(courseIDs)
                    let courseDetailsIDs = user.val()["studentCourseDetailsIDs"]
                    console.log(courseDetailsIDs)
                    for (let i = 0; i < courseIDs.length; i++) {
                        dbRef.child("course").child(courseIDs[i]).get().then((course) => {
                            $('#courses').append('<option value=' + courseIDs[i] + '>' + course.val()['courseName'] + '</option>')
                            console.log(courseIDs[i])
                            console.log(course.val()['courseName'])

                        })
                    }
                    //To retrieve course Goal
                    for (let i = 0; i < courseDetailsIDs.length; i++) {
                        dbRef.child("studentCourseDetails").child(courseDetailsIDs[i]).get().then((childSnapshot) => {
                            var goal = childSnapshot.val()['studentGoal'];
                            console.log('goal', goal)
                            var courseID = childSnapshot.val()['courseIDs'];
                            console.log('courseID', courseID)
                            cid_courseGrade [courseID] = goal
                            console.log('cid_courseGrade [courseID]', cid_courseGrade [courseID])
                        });
                    }
                })

                $("#courses").change(function () {
                    let course_ID = this.value;
                    console.log('course_ID', this.value)
                    let course_goal = cid_courseGrade[course_ID]
                    $('#grades').empty().append("<thead class='GreyTableHeader'><tr><th class='text-left'> Course Goal " + course_goal + "%</th><th></th><th></th><th></th></tr></thead>")
                    $('#grades').append("<thead><tr><th>Item Name</th><th class='text-center'>Due Date</th><th class='text-center'>Status</th> <th class='text-center'>Grade</th></tr></thead><tbody id='bgrades'></tbody>")
                    let query = dbRef.child("assignmentSubmission");
                    query.once("value")
                        .then(function (snap) {
                            snap.forEach(function (assignmentSubmission) {
                                if (assignmentSubmission.val()["userID"] == userId && assignmentSubmission.val()["courseID"] == course_ID) {
                                    let score = "";
                                    let assignmentDuedate = "";
                                    let is_graded = "";
                                    let gradingIDs = assignmentSubmission.val()["assignmentGradingEventIDs"]
                                    let newestGradingIDs = gradingIDs[gradingIDs.length - 1]
                                    dbRef.child("assignment").child(assignmentSubmission.val()["assignmentID"]).get().then((assignment) => {
                                        dbRef.child("assignmentDetails").child(assignment.val()['assignmentDetailsID']).get().then((assignmentDetails) => {
                                            dbRef.child("assignmentGradingEvent").child(newestGradingIDs).get().then((assignmentGrading) => {
                                                let totalScore = assignmentSubmission.val()["assignmentTotalScore"]
                                                score = ((assignmentGrading.val()["score"] / totalScore) * 100).toFixed(2)
                                                assignmentDuedate = assignmentDetails.val()["assignmentDuedate"]
                                                is_graded = assignmentSubmission.val()["isGraded"]
                                                    $('#bgrades').append(
                                                        "<tr><td>" + assignment.val()['assignmentTitle'] + "</td><td class='text-center'> " + assignmentDuedate + "</td><td class='text-center'>" + ((is_graded) ? "Graded" : "Unopened") + "</td><td class='text-center'><div class='" + gradeColor(score, course_goal) + "'>" + score + "%</div></td></tr>"
                                                    )
                                            });

                                        });
                                    });
                                }
                            });
                        });
                });
            } else {
                console.log("Not logged in!")
            }
        })
    }
)