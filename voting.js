const { post } = require("jquery");

function upVote(postTime) {
    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    console.log(posts)

    oldPostObj = null

    for (i = 0; i < posts["posts"].length; i++) {
        if (posts["posts"][i].time == postTime) {
            oldPostObj = posts["posts"][i]
            posts["posts"].splice(i,1);
        } else {
            
        }
    }
}

function downVote(postTime) {
    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    for (i = 0; i < posts["posts"].length; i++) {
        if (posts["posts"][i].time == postTime) {
            console.log('foudn it')
        } else {
            console.log('not found it')
        }
    }

}