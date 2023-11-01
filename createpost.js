const fs = require('fs')

function addPost() {
    /**
     * this function will take two user inputs of the title of the post and the main text content of the post and 
     * then it will assign it a date and time and the username of who posted it to be stored later.
     * 
     * args:
     *  user inputted title
     *  user inputted content
     *  backend date
     *  backend time
     *  backend username
     * 
     * returns:
     *  nothing, just saves the post data to the json file for long term storage and retrieval
     */

    const inputs = document.getElementById("addForm").elements;

    let userTitle = inputs[0].value;
    let userText = inputs[1].value;  

    let currentUser = null
    
    fs.readFile('currUser.txt', 'utf8', function(err, data) {
        if (err) throw err;
        currentUser = data
      });

    var datetime = new Date(); 

    postObj = {
        title: userTitle,
        text: userText,
        year: datetime.getFullYear(),
        month: datetime.getMonth(),
        day: datetime.getDay(),
        time: datetime.getTime(),
        userPosted: currentUser,
        votes: 0
    }

    if (true == true) {

        console.log(postObj)
    
        let postsJson = fs.readFileSync("posts.json", "utf-8");
    
        let posts = JSON.parse(postsjson);
    
        posts.push(postObj)
    
        postsjson = JSON.stringify(posts);
    
        fs.writeFileSync("posts.json", postsJson, "utf-8");
    
        //document.location.href='./index.html'
      }
}