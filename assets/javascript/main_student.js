
// logout

btnlogout = document.getElementById("btnLogout");

btnlogout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();

    auth.onAuthStateChanged(function (user) {

        if (user) {
            // User is signed in, call setUserInfo here

            //console.log(user);
            //window.location.href = "main.html";
        } else {
            //No user is signed in.
            //window.alert("signout");
            console.log("logged out");
            window.location.href = "index.html";
        }
    });

})




