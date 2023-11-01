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
    
    fs.readFile('currUser.txt', 'utf8', function(err, data) {
        if (err) throw err;
        let currentUser = data
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
}