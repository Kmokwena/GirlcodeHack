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
  }
  if (email === "" && cellphone === "") {
    errorMsg.innerHTML = "Please enter your email or cellphone number.";
  }
  if (password != confirmPass) {
    errorMsg.innerHTML = "Your passwords do not match";
  }
  if (idNumber.match(/[\/D]/) === false || idNumber.length > 13) {
    errorMsg.innerHTML = "Your ID number is invalid.";
  }
  if (
    idNumber[7] === "5" ||
    idNumber[7] === "6" ||
    idNumber[7] === "7" ||
    idNumber[7] === "8" ||
    idNumber[7] === "9"
  ) {
    errorMsg.innerHTML = "You are not a female.";
  }
  if (password.length < 6) {
    errorMsg.innerHTML = "Password should be more than 5 characters long.";
  }
  if (/[\/d\/w]/.test(password) === false) {
    errorMsg.innerHTML = "Password should include letters and number.";
  }

  axios.post('/users/register', userData)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
}

function isLoginValid() {
  console.log(email);
}
