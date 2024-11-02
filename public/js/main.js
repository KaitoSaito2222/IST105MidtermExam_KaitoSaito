function authStateListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      location.href = "culturalconnections.html";
    } else {
    }
  });
}

window.addEventListener("load", function () {
  //Listen for auth state changes
  authStateListener();

  document
    .getElementById("sign-in-button")
    .addEventListener("click", function () {
      let provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope("email");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log("Logging sucessfully", result.user);
          location.href = "culturalconnections.html";
        })
        .catch(function (error) {
          console.log("Logging fail", error);
        });
    });

  document.getElementById("sign-in-2").addEventListener("click", function () {
    let emailTxt = document.getElementById("email").value;
    let passtxt = document.getElementById("password").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(emailTxt, passtxt)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log("Logging sucessfully");
        alert("Logging sucessfully");
        location.href = "culturalconnections.html";
      })
      .catch((error) => {
        let errorMessage = error.message;
        alert("Logging fail");
        console.log("Logging fail", errorMessage);
      });
  });

  document
    .getElementById("phone-sign-in-button")
    .addEventListener("click", function () {
      const recaptchaContainer = document.getElementById("recaptcha-container");

      recaptchaContainer.innerHTML = "";

      const appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        }
      );

      let phoneNumber = document.getElementById("phoneNumber").value;
      let testVerificationCode = "123456";
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmResult) => {
          window.confirmResult = confirmResult;
          window.confirmResult.confirm(testVerificationCode).then((result) => {
            console.log(JSON.stringify(result.user));
          });
        })

        .catch((error) => {
          let errorMessage = error.message;
          alert("Logging fail");
          console.log("Logging fail", errorMessage);
        });
    });
});
