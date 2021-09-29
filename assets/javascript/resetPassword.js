
const resetPassword = document.getElementById('forgot');
  resetPassword.addEventListener( 'click' , e => {
      e.preventDefault();
      const resetEmail = document.getElementById('reset_email').value;
      auth.sendPasswordResetEmail(resetEmail)
      .then(()=>{
          console.log(resetEmail)
            alert("Email has been sent to you. Please check and verify.")
            console.log("password reset email sent successsfully")
      }).catch(error =>{
            alert('Your email is incorrect');
          console.log(error.message)
      })
  })


