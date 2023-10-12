const fs = require('fs')
const CryptoJS = require('crypto-js');  

function passwordEncrypter(password) {
  /**
  * takes the password that was inputted into the user form from the submitRegData function and encrypts the password for storage
  * args:
  *   just the password from the submitRegData() function
  *
  * returns the encrypted password for storage
  */
 encryptedPassword = CryptoJS.SHA256(password).toString()
 return encryptedPassword
}

function submitLoginData() {
  const inputs = document.getElementById("logForm").elements;

  let uname = inputs[0].value;
  let pword = inputs[1].value;

  let usersjson = fs.readFileSync("users.json","utf-8");

  let users = JSON.parse(usersjson);

  for (i=0;i<users["users"].length;i++){

    if (users["users"][i].Username == uname) {
      if (passwordEncrypter(pword) == users["users"][i].Password) {
        alert(`Welcome to Electro, ${users["users"][i].FirstName}.`)
        break
      }
    }
    if (i == users["users"].length-1) {
      alert("no user data by that login information")
    }
  }
}