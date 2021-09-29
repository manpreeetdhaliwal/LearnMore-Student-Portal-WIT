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
let terms = new Map();

$(document).ready(
    function () {
        let logged_in = false;
        let userId = null;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userId = "userID_" + user.uid;
                logged_in = true;
                dbRef.child("user").child(userId).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        const record = snapshot.val()
                        var welcome_message = `Hi ${record['userFirstName']} ${record['userLastName']}`
                        $('.greetings').text(welcome_message)

                        let course_ids = record["courseIDs"]
                        let color_cycle = {}

                        for (let i = 0; i < course_ids.length; i++) {
                            dbRef.child("course").child(course_ids[i]).get().then((course) => {
                                let courseName = course.val()['courseName'];
                                let term = course.val()['courseTerm'];
                                let courseTerm = term.replace(' ', '');
                                if (terms.has(courseTerm)) {
                                    let myarray = terms.get(courseTerm)
                                    myarray.push(courseName)
                                    color_cycle[courseTerm] = !(color_cycle[courseTerm])
                                    $('<li class="list-group-item">' + courseName + '</li>').addClass(((color_cycle[courseTerm]) ? "dark" : "light")).appendTo('.' + courseTerm)
                                } else {
                                    let temp_arr = [];
                                    temp_arr.push(courseName)
                                    terms.set(courseTerm, temp_arr)
                                    color_cycle[courseTerm] = true
                                    $('#classes_list').append('<ol class=' + courseTerm + ' list-group>' + '<H4>' + term + '</H4></ol>')
                                    $('<li class="list-group-item">' + courseName + '</li>').addClass(((color_cycle[courseTerm]) ? "dark" : "light")).appendTo('.' + courseTerm)
                                }
                            })
                        }
                    }
                })

            } else {
                console.log("Not logged in!")
            }
        })
    }
)