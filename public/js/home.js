function authStateListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      // ...
    } else {
      signOut();
      location.href = "index.html";
    }
  });
}

window.addEventListener("load", function () {
  //Listen for auth state changes
  authStateListener();

  document.getElementById("sign-out").addEventListener("click", function () {
    signOut();
  });
});

function signOut() {
  console.log("signOut");
  firebase
    .auth()
    .signOut()
    .then(() => {})
    .catch((error) => {});
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
