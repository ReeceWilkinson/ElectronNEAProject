const { post } = require("jquery");

function upVote(postTime,postID) {
    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    oldPostObj = null

    NewpostObj = {}

    for (i = 0; i < posts["posts"].length; i++) {
        if (posts["posts"][i].time == postTime) {

            oldPostObj = posts["posts"][i]

            var NewpostObj = {
                id: oldPostObj.id,
                title: oldPostObj.title, 
                text: oldPostObj.text,
                year: oldPostObj.year,
                month: oldPostObj.month,
                day: oldPostObj.day,
                time: oldPostObj.time,
                userPosted: oldPostObj.userPosted,
                votes: oldPostObj.votes + 1,
                pathToImage: oldPostObj.pathToImage
            }

            posts["posts"].splice(i,1)
        }
    }

    document.getElementById(postID.id).innerHTML = NewpostObj.votes

    posts["posts"].push(NewpostObj)

    postsJson = JSON.stringify(posts);
    
    fs.writeFileSync("posts.json", postsJson, "utf-8");
}

function downVote(postTime,postID) {
    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);


    oldPostObj = null

    NewpostObj = {}

    for (i = 0; i < posts["posts"].length; i++) {
        if (posts["posts"][i].time == postTime) {

            oldPostObj = posts["posts"][i]

            var NewpostObj = {
                id: oldPostObj.id,
                title: oldPostObj.title,   
                text: oldPostObj.text,
                year: oldPostObj.year,
                month: oldPostObj.month,
                day: oldPostObj.day,
                time: oldPostObj.time,
                userPosted: oldPostObj.userPosted,
                votes: oldPostObj.votes - 1,
                pathToImage: oldPostObj.pathToImage
            }

            posts["posts"].splice(i,1)
        }
    }

    document.getElementById(postID.id).innerHTML = NewpostObj.votes

    posts["posts"].push(NewpostObj)

    postsJson = JSON.stringify(posts);
    
    fs.writeFileSync("posts.json", postsJson, "utf-8");

}