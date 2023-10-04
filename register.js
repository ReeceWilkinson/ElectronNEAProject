const fs = require('fs')

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

  hashedPword = passwordHasher(pword)

  var userObj = {
    FirstName: fname,
    LastName: lname,
    UserName: uname,
    Password: hashedPword
  };

  let userJson = fs.readFileSync("users.json");

  let usersList = JSON.parse(userJson);

  usersList.push(userObj);

  userJson = JSON.stringify(usersList);

  fs.writeFileSync("users.json",userJson)

}

function passwordHasher(pword) {
  
}