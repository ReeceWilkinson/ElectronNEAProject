function submitRegData() {
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

  document.getElementById('textTest').innerHTML = userObj;
  console.log(userObj)
}