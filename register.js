const fs = require('fs');

function submitRegData() {
  const inputs = document.getElementById("regForm").elements;

  let uname = inputs[0].value;
  let fname = inputs[1].value;
  let lname = inputs[2].value;
  let pword = inputs[3].value;

  var userObj = {
    FirstName: fname,
    LastName: lname,
    UserName: uname,
    Password: pword
  };

  console.log(userObj)
}