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
    
    var currentUser = fs.readFileSync('currUser.txt','utf8')

    var datetime = new Date(); 

    let postObj = {
        title: userTitle,   
        text: userText,
        year: datetime.getFullYear(),
        month: datetime.getMonth() + 1,
        day: datetime.getDate(),
        time: datetime.toLocaleTimeString(),
        userPosted: currentUser,
        votes: 0
    }

    if (true == true) {

        console.log(postObj)
    
        let postsJson = fs.readFileSync("posts.json", "utf-8");

        console.log(postsJson)
    
        let posts = JSON.parse(postsJson);

        console.log(posts)

        posts["posts"].push(postObj)

        console.log(posts)
    
        postsJson = JSON.stringify(posts);

        console.log(postsJson)
    
        fs.writeFileSync("posts.json", postsJson, "utf-8");
    
        document.location.href='./index.html'
      }
}