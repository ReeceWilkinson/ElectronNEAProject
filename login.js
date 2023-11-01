const fs = require('fs')
const CryptoJS = require('crypto-js');  
const { dialog } = require('electron')

function currentUsernameWriter(uname) {
  /**
   * this function will simply take the username that was used to login and write it to a text file for later use
   * 
   * args:
   *  just the current username used to login
   * 
   * returns nothing but will write the username to a text file
   */

  fs.writeFile('currUser.txt', uname, (err) => {
    if (err) throw err;
  })
}

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
  /**
   * takes 2 user inputs as the username and password from the user and checks the file of user data for the right login information
   * args:
   *  password and username from the html form user inputs
   * 
   * returns nothing but will either let the user access the program if the data is correct or not.
   */
  const inputs = document.getElementById("logForm").elements;

  let uname = inputs[0].value;
  let pword = inputs[1].value;

  let usersjson = fs.readFileSync("users.json","utf-8");

  let users = JSON.parse(usersjson);

  for (i=0;i<users["users"].length;i++){

    if (users["users"][i].Username == uname) {
      if (passwordEncrypter(pword) == users["users"][i].Password) {
        currentUsernameWriter(uname)
        document.location.href='./index.html'
        break
      }
    }
    if (i == users["users"].length-1) {
      document.getElementById('userMsg').innerHTML = "No user data by that login information. Please try again :)"
    }
  }
}