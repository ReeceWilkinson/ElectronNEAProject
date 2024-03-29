function searching() {
    /**
     * this will be the function used to search for user titles. it will simply just check if the titles 
     * of the posts are the same as the posts searched.
     * 
     * args:
     *       - no passed paramaters other then the user input of the title
     * 
     * returns:
     *      - no data returns as will simply just display either the posts to the user or the message saying there is nothing to find
     */

    const search = document.getElementById("givenTitle").value.toLowerCase();

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    foundPosts = []

    for (i = 0; i < posts["posts"].length; i++) {
        if (posts["posts"][i].title.toLowerCase().includes(search)) {
            foundPosts.push(posts["posts"][i])
        } else if (posts["posts"][i].userPosted.toLowerCase().includes(search)){
            foundPosts.push(posts["posts"][i])
        }
    }

    if (foundPosts.length >= 1) {
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < foundPosts.length; i++) {
            addfullId = addidName + String(addidNum)
            $( ".main-container" ).prepend( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${foundPosts[i].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${foundPosts[i].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${foundPosts[i].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${foundPosts[i].title}</b></h2>
                                                <h3>${foundPosts[i].day}/${foundPosts[i].month}/${foundPosts[i].year} ${foundPosts[i].time}</h3>
                                                <p>${foundPosts[i].text}</p>
                                                <img src="${foundPosts[i].pathToImage}" width="300px" height="300px">
                                                <h3>${foundPosts[i].userPosted}</h3>
                                                </div>` );
            addidNum = addidNum + 1
    }
    } else {
        $('.main-container').empty();
        $(".main-container").append('<div class="posts"><h1>No posts with that username or title.</h1></div>')
    }
}