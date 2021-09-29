

function validateRegisterForm(firstName, lastName, email, password, confirmPassword, currUserRole) {
    console.log("email pass role " + email + " " + password + " " + " " + confirmPassword + " " + currUserRole);

    const isFirstNameValid = validatefirstName(firstName);
    const isLastNameValid = validatelastName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validatConfirmPassword(confirmPassword, password);
    const isUSerRoleValid = validateUserRole(currUserRole);


    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isUSerRoleValid) {
        console.log("all are valid")
        return true;
    } else {
        console.log("invalid input fields")
        return false;
    }
}





function validateLoginForm(email, password) {
    console.log("email pass " + email + " " + password);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validateLoginPassword(password);

    if (isEmailValid && isPasswordValid) {
        console.log("all are valid")
        return true;
    } else {
        console.log("invalid input fields")
        return false;
    }
}




function validateUserRole(currUserRole) {

    var isUSerRoleValid = true;
    if ((!currUserRole) && !(currUserRole == "teacher" || currUserRole == 'student')) {
        console.log("currUserRole error");
        const message = "Please select your role"
        displayFormErrorMsg(message, 'userRoleError'); // id of tag in html form is userRoleError
        isUSerRoleValid = false;
    }
    return isUSerRoleValid;
}



function validatefirstName(firstName) {

    var isFirstNameValid = true;
    if (!firstName) {
        console.log("first name error");
        const message = "Please provide a first name";
        displayFormErrorMsg(message, 'firstNameError'); // id of tag in html form is passwordError
        isFirstNameValid = false;
    }
    return isFirstNameValid;
}


function validatelastName(lastName) {

    var isLastNameValid = true;
    if (!lastName) {
        console.log("last name error");
        const message = "Please provide a lasr name";
        displayFormErrorMsg(message, 'lastNameError'); // id of tag in html form is passwordError
        isLastNameValid = false;
    }
    return isLastNameValid;
}

function validateEmail(email) {

    var isEmailValid = true;
    const emailRegx = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email) {
        console.log("email error");
        const message = "Please provide an email address"
        displayFormErrorMsg(message, 'emailError'); // id of tag in html form is emailError
        isEmailValid = false;
    }
    else if (!emailRegx.test(email)) {
        const message = "Invalid email address"
        displayFormErrorMsg(message, 'emailError'); // id of tag in html form is emailError
        isEmailValid = false;
    }

    return isEmailValid;


}

function validateLoginPassword(password) {

    var isPasswordValid = true;
    if (!password) {
        console.log("password error");
        const message = "Please provide a password";
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError
        isPasswordValid = false;
    }
    return isPasswordValid;
}



function validatePassword(password) {

    var isPasswordValid = true;
    const passwordRule1 = new RegExp("^(?=.*[a-z])");   // password must contain a lower case letter
    const passwordRule2 = new RegExp("^(?=.*[A-Z])");   // password must contain an upper case letter
    const passwordRule3 = new RegExp("^(?=.*[0-9])");   // password must contain a numeric digit
    const passwordRule4 = new RegExp("^(?=.*[!@#\$%\^&\*])");   // password must contain a special character

    if (!password) {
        console.log("undefined password error");
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError       
        isPasswordValid = false;
    }
    else if (password.length < 8) {
        const message = "Invalid password, length should be atleast 8 character";
        console.log(message);
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError            
        isPasswordValid = false;
    }
    else if (!passwordRule1.test(password)) {
        const message = "Invalid password. It must contain lowercase letter. "
        console.log(message);
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError       
        isPasswordValid = false;
    }
    else if (!passwordRule2.test(password)) {
        const message = "Invalid password. It must contain an uppercase letter. "
        console.log(message);
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError     
        isPasswordValid = false;
    }
    else if (!passwordRule3.test(password)) {
        const message = "Invalid password. It must contain a numeric digit. "
        console.log(message);
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError        
        isPasswordValid = false;
    }
    else if (!passwordRule4.test(password)) {
        const message = "Invalid password. It must contain a special character. "
        console.log(message);
        displayFormErrorMsg(message, 'passwordError'); // id of tag in html form is passwordError       
        isPasswordValid = false;
    }


    return isPasswordValid;
}




function validatConfirmPassword(confirmPassword, password) {

    var isConfirmPasswordValid = true;
    if (!confirmPassword) {
        console.log("confirm password error");
        const message = "Please provide a password";
        displayFormErrorMsg(message, 'confirmPasswordError'); // id of tag in html form is confirmPasswordError
        isConfirmPasswordValid = false;
    }
    else if (confirmPassword != password) {
        const message = "Passwords do not match";
        displayFormErrorMsg(message, 'confirmPasswordError'); // id of tag in html form is confirmPasswordError
        isConfirmPasswordValid = false;
    }

    return isConfirmPasswordValid;


}


// displaying error message on form
function displayFormErrorMsg(message, feild) {
    console.log("error filed:", feild);
    var errorFeild = document.getElementById(feild);
    console.log("error filed:", errorFeild);
    errorFeild.innerHTML = message;

}




// getting all error messages (having class 'form-error') on the form and setting there inner html to ""
function hideFormErrorMsgs() {
    var errorMsgs = document.getElementsByClassName('form-error');
    for (var i = 0; i < errorMsgs.length; i++) {
        errorMsgs[i].innerHTML = "";
    }
}
