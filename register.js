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

  var userObj = {
    FirstName: fname,
    LastName: lname,
    UserName: uname,
    Password: pword
  };

  console.log(userObj)

  let usersjson = fs.readFileSync("users.json","utf-8");

  let users = JSON.parse(usersjson);

  users["users"].push(userObj)

  usersjson = JSON.stringify(users);

  fs.writeFileSync("users.json",usersjson,"utf-8");
}