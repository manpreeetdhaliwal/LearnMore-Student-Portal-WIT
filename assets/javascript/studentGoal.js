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

function setCourseGoal(courseGoalID, course_id, goal_grade, userId) {
    dbRef.child("studentCourseDetails").child(courseGoalID).set({
        courseIDs: course_id,
        studentGoal: goal_grade
    }).then(() => {
        dbRef.child("user").child(userId).child('studentCourseDetailsIDs').get().then((goals) => {
            console.log(goals.val())
            let studentCourseDetailsIDs = []
            if (goals.exists()) {
                studentCourseDetailsIDs = goals.val()
            }
            studentCourseDetailsIDs.push(courseGoalID)
            dbRef.child("user").child(userId).update({
                studentCourseDetailsIDs
            }).then(()=>{
                window.location.href = "student_dashboard.html";
            })
        })
    })



}

$(document).ready(
    function (){
        let logged_in = false;
        let userId = null;


        //Please put this code where you successfully register the course for a user inside the firebase, courseID should be the course ID without the "CourseID_" part.
        // window.localStorage.setItem("latest_added_course", courseID)

        let course_id = window.localStorage.getItem("latest_added_course");

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = "userID_" + user.uid;
                logged_in = true
                dbRef.child("user").child(userId).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        const record = snapshot.val()
                        var welcome_message = `Hi ${record['userFirstName']} ${record['userLastName']}!`
                        $('#name').text(welcome_message)
                        dbRef.child("course").child(course_id).get().then((course)=> {
                            // $('#course_name').text(`You have successfully joined ${course.val()['courseName']} - ${course.val()['courseCode']}.`)
                            $('#course_name').text(`You have successfully joined ${course.val()['courseName']}.`)

                        })

                        $('#submitTargetGrade').click(function (){

                            const goal_grade = $('#goal_grade').val()
                            const courseGoalID = "courseDetailsID_"+ uuidv4()
                            setCourseGoal(courseGoalID, course_id, goal_grade, userId);
                        })

                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });

            } else {
                console.log("Not logged in!")
            }
        })
    }
)