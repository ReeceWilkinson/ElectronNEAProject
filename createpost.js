const fs = require('fs')
const imageToBase64 = require('image-to-base64');

function lengthChecker(title,text) {
    /**
     * this function simply finds the length of the title and the text of the post and checks if the lengths are under
     * the required limits of 512 for the text and 128 characters for the title respectively.
     * 
     * args:
     *  -   the title to be checked
     *  -   the text of the post to be cheecked
     * 
     * returns true if the lengths are under the limits or false if over
     */
    if (text.length > 512 || title.length > 128 || text.length < 1 || title.length < 1) {
        if (text.length > 512) {
            document.getElementById('userMsg').innerHTML = "Main content cannot be more then 512 characters."
        } else if (text.length < 1) {
            document.getElementById('userMsg').innerHTML = "Main content cannot be less then 1 character."
        } else if (title.length > 128) {
            document.getElementById('userMsg').innerHTML = "Title cannot be more then 128 characters."
        } else if (title.length < 1) {
            document.getElementById('userMsg').innerHTML = "Title cannot be less then 1 character."
        }
    } else {
        return true
    }
}

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

    var input = document.getElementById('imageInput');

    var file = input.files[0];

    var currentUser = fs.readFileSync('currUser.txt','utf8')

    let outputString = ''

    var datetime = new Date(); 

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let postObj = {
        id: posts["posts"].length,
        title: userTitle,   
        text: userText,
        year: datetime.getFullYear(),
        month: datetime.getMonth() + 1,
        day: datetime.getDate(),
        time: datetime.toLocaleTimeString(),
        userPosted: currentUser,
        votes: 0,
        pathToImage: file.path
    }

    if (lengthChecker(userTitle,userText) == true) {
    
        let postsJson = fs.readFileSync("posts.json", "utf-8")

        let posts = JSON.parse(postsJson);

        posts["posts"].push(postObj)

        postsJson = JSON.stringify(posts);
    
        fs.writeFileSync("posts.json", postsJson, "utf-8");
    
        document.location.href='./index.html'
      }
}