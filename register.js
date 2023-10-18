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

function usernameChecker(username) {
  /**
   * takes a username input from the main function and checks if it is a duplicate username
   * args:
   *  username from the main submitRegData function
   * 
   * returns true if there is no duplicate username or false if it is a duplicate
   */
  let usersjson = fs.readFileSync("users.json","utf-8");

  let users = JSON.parse(usersjson);

  checker = true

  for (i=0;i<users["users"].length;i++){
    if (users["users"][i].Username == username) {
      alert('Username already exists.')
      checker = false
    }
  }

  if (checker == false) {
    return false
  } else {
    return true
  }
}

function charChecker(fname,lname){
  /**
   * checks the first and last names that the user inputted for any special characters or numbers
   * 
   * args:
   *  fname - first name user inputted
   *  lname - last name user inputted
   * 
   * returns either true if neither name contains any banned characters or false if the names do contain an characters
   */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  const numbersEx = /\d+/
  fnameTestChars = specialChars.test(fname);
  fnameTestNums = numbersEx.test(fname);
  lnameTestNums = numbersEx.test(lname);
  lnameTestChars = specialChars.test(lname);
  if (fnameTestChars == false && lnameTestChars == false && fnameTestNums == false && lnameTestNums == false) {
    return true
  } else {
    alert("Cannot contain any special characters or numbers in first or last name.")
    return false
  }
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
  let usernameValidation = false

  if (pword.length >= 7 && uname.length >= 2) {
    if (pword.length != 0 && uname.length != 0 && fname.length != 0 && lname.length != 0) {
      encryptedPassword = passwordEncrypter(pword,uname)
      valid = true
    }
  }

  var userObj = {
    FirstName: fname,
    LastName: lname,
    Username: uname,
    Password: encryptedPassword,
  };

  let charValidation = charChecker(fname,lname)

  if (/\s/g.test(uname) == false) {
    usernameValidation = true
  } else {
    alert('Username cannot have spaces in.')
  }

  usernameCheck = usernameChecker(uname)

  if (valid == true && charValidation == true && usernameValidation == true && usernameCheck == true) {

    console.log(userObj)

    let usersjson = fs.readFileSync("users.json", "utf-8");

    let users = JSON.parse(usersjson);

    users["users"].push(userObj)

    usersjson = JSON.stringify(users);

    fs.writeFileSync("users.json", usersjson, "utf-8");

    alert('Thank you for registering an account, feel free to login now :)')
    document.location.href='./login.html'
  }
}