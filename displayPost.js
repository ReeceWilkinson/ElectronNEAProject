const fs = require('fs')

function displayPost() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null

    for (i = 0; i < posts["posts"].length; i++) {
        currPostObj = posts["posts"][i]
        console.log(currPostObj)
    }
}