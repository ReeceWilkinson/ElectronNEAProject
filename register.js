const fs = require('fs')
const CryptoJS = require('crypto-js');  

function passwordEncrypter(password,uname) {
  /**
  * takes the password that was inputted into the user form from the submitRegData function and encrypts the password for storage
  * args:
  *   just the password from the submitRegData() function
  *
  * returns the encrypted password for storage
  */
 encryptedPassword = CryptoJS.AES.encrypt(password,uname).toString()
 return encryptedPassword
}

function submitRegData() {
  /**
  * takes the 4 userinputs from the html form, encodes the password so it can be stored safely and turns it into an object to be appended to the long term storage file
  *
  * args:
  *   4 user inputs being the username, password, first name and last name.
  *
  * doesnt return anything as it just adds the text to the json file for storage.
  */
  const inputs = document.getElementById("regForm").elements;

  let uname = inputs[0].value;
  let pword = inputs[1].value;
  let fname = inputs[2].value;
  let lname = inputs[3].value;

  let valid = false
  let encryptedPassword = ''

  if (pword.length >= 7 && uname.length >= 2) {
    if (pword.length != 0 && uname.length != 0 && fname.length != 0 && lname.length != 0) {
      encryptedPassword = passwordEncrypter(pword,uname)
      valid = true
    }
  }

  var userObj = {
    FirstName: fname,
    LastName: lname,
    UserName: uname,
    Password: encryptedPassword,
  };

  if (valid == true) {

    console.log(userObj)

    let usersjson = fs.readFileSync("users.json", "utf-8");

    let users = JSON.parse(usersjson);

    users["users"].push(userObj)

    usersjson = JSON.stringify(users);

    fs.writeFileSync("users.json", usersjson, "utf-8");

  }
}