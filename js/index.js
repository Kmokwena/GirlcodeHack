const password = document.getElementById("surname").value;
const confirmPass = document.getElementById("confirmpassword").value;
const errorMsg = document.getElementById("errorMsgs");

let email = document.getElementById("email");
function isRegValid() {
  console.log(password + " , " + confirmPass);

  //errorMsg.innerHTML = "Your passwords do not match";
}

function isLoginValid() {
  console.log(email);
}
