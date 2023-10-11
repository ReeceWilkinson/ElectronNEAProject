const fs = require('fs')
const win = require('')

function submitLoginData() {
  const inputs = document.getElementById("logForm").elements;

  let uname = inputs[0].value;
  let pword = inputs[1].value;

  var userObj = {
    Username: uname,
    Password: pword
  }

  let usersjson = fs.readFileSync("users.json","utf-8");

  let users = JSON.parse(usersjson);

  for (i=0;i<users["users"].length;i++){
    if (users["users"][i].Username == userObj.Username) {
      if (users["users"][i].Password == userObj.Password) {
        document.location.href='./index.html'
        alert(`Welcome to Electro, ${users["users"][i].FirstName}.`)
        break
      }
    }
    if (i == users["users"].length-1) {
      alert("no user data by that login information")
    }
  }
}