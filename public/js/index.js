const errorMsg = document.getElementById("errorMsgs");
function isRegValid() {
  const password = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmpassword").value;
  const idNumber = document.getElementById("idNum").value;
  const username = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const cellphone = document.getElementById("cellphone").value;

  const userData = {username, surname, email, idNumber, password, cellphone}
  if (
    password === "" ||
    idNumber === "" ||
    username === "" ||
    surname === "" ||
    password === "" ||
    password === null
  ) {
    errorMsg.innerHTML = "Enter all fields";
    return false
  }
  if (email === "" && cellphone === "") {
    errorMsg.innerHTML = "Please enter your email or cellphone number.";
    return false
  }
  if (password != confirmPass) {
    errorMsg.innerHTML = "Your passwords do not match";
    return false
  }
  if (idNumber.match(/\D/)  || idNumber.length != 13) {
    errorMsg.innerHTML = "Your ID number is invalid.";
    return false
  }
  if (
    idNumber[7] >= 5 && idNumber[7] <= 9  ) {
    errorMsg.innerHTML = "You are not a female.";
    return false
  }
  if (password.length < 6) {
    errorMsg.innerHTML = "Password should be more than 5 characters long.";
    return false
  }
  if (/\w/.test(password) === false || /\d/.test(password) === false) {
    errorMsg.innerHTML = "Password should include letters and number.";
    return false
  }

  axios.post('/users/register', userData)
  .then(function (response) {
    window.location.replace("/welcome.html") //redirect here
  })
  .catch(function (error) {
    errorMsg.innerHTML = "registration failed";
  })
  return true;
}

function isLoginValid() {
  console.log(email);
}
