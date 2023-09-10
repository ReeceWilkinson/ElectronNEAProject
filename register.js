const fs = require('fs/promises')
const { writeFile, readFile } = require('fs');

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

    let config = JSON.stringify(userObj)
    const path = './users.json'

    readFile(path, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        const parsedData = JSON.parse(data);
        parsedData.createdAt = new Date().toISOString();
        writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
          if (err) {
            console.log('Failed to write updated data to file');
            return;
          }
          console.log('Updated file successfully');
        });
      });
  }