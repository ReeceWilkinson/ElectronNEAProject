window.$ = window.jQuery = require('jquery');

function sorter(sender) {
    /** 
     * this is the function that will actually decide which sort to use
     * 
     * args:
     * - no given parameters but outcome will vary based on which function was called first.
     * 
     * returns:
     *  no actual data returns, just adds the html
     */

    if (sender == 'newest' || sender == 'onLoad') {
        document.getElementById("bodyTag").onload = newestSort();
    } else if (sender == 'oldest') {
        document.getElementById("bodyTag").onload = oldestSort();
    } else if (sender == 'alphaTitle') {
        document.getElementById("bodyTag").onload = alphaTitleSort();
    } else if (sender == 'alphaName') {
        document.getElementById("bodyTag").onload = alphaUserSort();
    } else if (sender == 'votesASC') {
        document.getElementById("bodyTag").onload = votesSortASC();
    } else if (sender == 'votesDSC') {
        document.getElementById("bodyTag").onload = votesSortDSC();
    }
}

sortCounter = 1

function newestSort() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */
    document.getElementById("sortbuttonID").innerHTML = "Sort: Newest";
    document.getElementById("sortbuttonID").style.width = "150px";
    document.getElementById("sortContainer").style.left = "823px";
    document.getElementById("dropdown-content").style.width = "150px";

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let sortedID = []

    if (posts["posts"].length >= 1){ 
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < posts["posts"].length; i++) {
            sortedID.push(`${posts["posts"][i].id}`)
        } 
        sortedID.sort()
        for (j = 0; j < sortedID.length; j++) {
            // outer loop will get each of the sorted titles
            currentSortedID = sortedID[j]
            for (let k = 0; k < posts["posts"].length; k++) {
                currPostObj = posts["posts"][k]
                if (posts["posts"][k].id == currentSortedID) {
                    addfullId = addidName + String(addidNum)
                    $( ".main-container" ).prepend( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${posts["posts"][k].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${posts["posts"][k].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${posts["posts"][k].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${posts["posts"][k].title}</b></h2>
                                                <h3>${posts["posts"][k].day}/${posts["posts"][k].month}/${posts["posts"][k].year} ${posts["posts"][k].time}</h3>
                                                <p>${posts["posts"][k].text}</p>
                                                <img src="${posts["posts"][k].pathToImage}" width="300px" height="300px">
                                                <h3>${posts["posts"][k].userPosted}</h3>
                                                </div>` );
                    addidNum = addidNum + 1
                    posts["posts"].splice(k,1)
                } else {
                    console.log('not this one')
                }
            }
        }
    }
}

function oldestSort() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */
    document.getElementById("sortbuttonID").innerHTML = "Sort: Oldest";
    document.getElementById("sortbuttonID").style.width = "150px";
    document.getElementById("sortContainer").style.left = "823px";
    document.getElementById("dropdown-content").style.width = "150px";

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null

    let sortedID = []

    if (posts["posts"].length >= 1){ 
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < posts["posts"].length; i++) {
            sortedID.push(`${posts["posts"][i].id}`)
        } 
        sortedID.sort()
        for (j = 0; j < sortedID.length; j++) {
            // outer loop will get each of the sorted titles
            currentSortedID = sortedID[j]
            for (let k = 0; k < posts["posts"].length; k++) {
                currPostObj = posts["posts"][k]
                if (posts["posts"][k].id == currentSortedID) {
                    addfullId = addidName + String(addidNum)
                    $( ".main-container" ).append( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${posts["posts"][k].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${posts["posts"][k].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${posts["posts"][k].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${posts["posts"][k].title}</b></h2>
                                                <h3>${posts["posts"][k].day}/${posts["posts"][k].month}/${posts["posts"][k].year} ${posts["posts"][k].time}</h3>
                                                <p>${posts["posts"][k].text}</p>
                                                <img src="${posts["posts"][k].pathToImage}" width="300px" height="300px">
                                                <h3>${posts["posts"][k].userPosted}</h3>
                                                </div>` );
                    addidNum = addidNum + 1
                    posts["posts"].splice(k,1)
                }
            }
        }
    }
}

function alphaTitleSort() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed. the posts will be sorted alphabetically by title for this sort.
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */

    document.getElementById("sortbuttonID").innerHTML = "Sort: Alpha (Title)";
    document.getElementById("sortbuttonID").style.width = "200px";
    document.getElementById("sortContainer").style.left = "773px";
    document.getElementById("dropdown-content").style.width = "200px";

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let sortedTitles = []

    if (posts["posts"].length >= 1){ 
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < posts["posts"].length; i++) {
            sortedTitles.push(`${posts["posts"][i].title}`.toLowerCase())
        } 
        sortedTitles.sort()
        for (j = 0; j < sortedTitles.length; j++) {
            // outer loop will get each of the sorted titles
            currentSortedTitle = sortedTitles[j]
            for (let k = 0; k < posts["posts"].length; k++) {
                currPostObj = posts["posts"][k]
                if (posts["posts"][k].title.toLowerCase() == currentSortedTitle) {
                    addfullId = addidName + String(addidNum)
                    $( ".main-container" ).append( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${posts["posts"][k].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${posts["posts"][k].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${posts["posts"][k].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${posts["posts"][k].title}</b></h2>
                                                <h3>${posts["posts"][k].day}/${posts["posts"][k].month}/${posts["posts"][k].year} ${posts["posts"][k].time}</h3>
                                                <p>${posts["posts"][k].text}</p>
                                                <img src="${posts["posts"][k].pathToImage}" width="300px" height="300px">
                                                <h3>${posts["posts"][k].userPosted}</h3>
                                                </div>` );
                    addidNum = addidNum + 1
                    posts["posts"].splice(k,1)
                }
            }
        }
    } else {
        $(".main-container").append('<div class="posts"><h1>No posts to display.</h1></div>')
    }
}

function alphaUserSort() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed. the posts will be sorted alphabetically by title for this sort.
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */
    document.getElementById("sortbuttonID").innerHTML = "Sort: Alpha (User)";
    document.getElementById("sortbuttonID").style.width = "200px";
    document.getElementById("sortContainer").style.left = "773px";
    document.getElementById("dropdown-content").style.width = "200px";

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null

    let pointerValue = 0
    let sortedNames = []

    if (posts["posts"].length >= 1){ 
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < posts["posts"].length; i++) {
            sortedNames.push(`${posts["posts"][i].userPosted}`.toLowerCase())
        } 
        sortedNames.sort()
        for (j = 0; j < sortedNames.length; j++) {
            // outer loop will get each of the sorted titles
            currentSortedTitle = sortedNames[j]
            for (let k = 0; k < posts["posts"].length; k++) {
                currPostObj = posts["posts"][k]
                if (posts["posts"][k].userPosted.toLowerCase() == currentSortedTitle) {
                    addfullId = addidName + String(addidNum)
                    $( ".main-container" ).append( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${posts["posts"][k].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${posts["posts"][k].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${posts["posts"][k].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${posts["posts"][k].title}</b></h2>
                                                <h3>${posts["posts"][k].day}/${posts["posts"][k].month}/${posts["posts"][k].year} ${posts["posts"][k].time}</h3>
                                                <p>${posts["posts"][k].text}</p>
                                                <img src="${posts["posts"][k].pathToImage}" width="300px" height="300px">
                                                <h3>${posts["posts"][k].userPosted}</h3>
                                                </div>` );
                    addidNum = addidNum + 1
                    posts["posts"].splice(k,1)
                }k
            }
        }
    } else {
        $(".main-container").append('<div class="posts"><h1>No posts to display.</h1></div>')
    }
}

function votesSortASC() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed. the posts will be sorted by the number of votes ascending for this sort.
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */
    document.getElementById("sortbuttonID").innerHTML = "Sort: Votes Ascending";
    document.getElementById("sortbuttonID").style.width = "150px";
    document.getElementById("sortContainer").style.left = "823px";
    document.getElementById("dropdown-content").style.width = "150px";

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let sortedID = []

    if (posts["posts"].length >= 1){ 
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < posts["posts"].length; i++) {
            sortedID.push(`${posts["posts"][i].votes}`)
        } 
        sortedID.sort(function(a, b) {
            return a - b;
          });
        for (j = 0; j < sortedID.length; j++) {
            // outer loop will get each of the sorted titles
            currentSortedID = sortedID[j]
            for (let k = 0; k < posts["posts"].length; k++) {
                currPostObj = posts["posts"][k]
                if (posts["posts"][k].votes == currentSortedID) {
                    addfullId = addidName + String(addidNum)
                    $( ".main-container" ).prepend( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${posts["posts"][k].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${posts["posts"][k].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${posts["posts"][k].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${posts["posts"][k].title}</b></h2>
                                                <h3>${posts["posts"][k].day}/${posts["posts"][k].month}/${posts["posts"][k].year} ${posts["posts"][k].time}</h3>
                                                <p>${posts["posts"][k].text}</p>
                                                <img src="${posts["posts"][k].pathToImage}" width="300px" height="300px">
                                                <h3>${posts["posts"][k].userPosted}</h3>
                                                </div>` );
                    addidNum = addidNum + 1
                    posts["posts"].splice(k,1)
                } else {
                    console.log('not this one')
                }
            }
        }
    }
}

function votesSortDSC() {
    /**
     * this function will read the posts.json file and take each object from the file and convert it into html code to be 
     * added to the main page feed. the posts will be sorted by the number of votes ascending for this sort.
     * 
     * args:
     *  - there will be no user fed arguments of this function as it will be ran upon loading the main page of posts every time
     * 
     * returns nothing as it simply just adds the html code to the page using all of the backend data.
     */
    document.getElementById("sortbuttonID").innerHTML = "Sort: Votes Ascending";
    document.getElementById("sortbuttonID").style.width = "150px";
    document.getElementById("sortContainer").style.left = "823px";
    document.getElementById("dropdown-content").style.width = "150px";

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let sortedID = []

    if (posts["posts"].length >= 1){ 
        $('.main-container').empty();
        addidNum = 0
        addidName = 'post'
        for (i = 0; i < posts["posts"].length; i++) {
            sortedID.push(`${posts["posts"][i].votes}`)
        } 
        sortedID.sort(function(a, b) {
            return a - b;
          });
        for (j = 0; j < sortedID.length; j++) {
            // outer loop will get each of the sorted titles
            currentSortedID = sortedID[j]
            for (let k = 0; k < posts["posts"].length; k++) {
                currPostObj = posts["posts"][k]
                if (posts["posts"][k].votes == currentSortedID) {
                    addfullId = addidName + String(addidNum)
                    $( ".main-container" ).append( `<div class="posts">
                                                <div  style="display: flex; width: 100%;justify-content: center;gap: 5px;">
                                                <button type="submit" id="votingButton" style="position: relative;" onclick="upVote('${posts["posts"][k].time}',${addfullId})">+</button><h1 style="position: relative;" id=${addfullId}>${posts["posts"][k].votes}</h1><button type="submit" id="votingButton" style="position: relative;" onclick="downVote('${posts["posts"][k].time}',${addfullId})">-</button>
                                                </div>
                                                <h2><b>${posts["posts"][k].title}</b></h2>
                                                <h3>${posts["posts"][k].day}/${posts["posts"][k].month}/${posts["posts"][k].year} ${posts["posts"][k].time}</h3>
                                                <p>${posts["posts"][k].text}</p>
                                                <img src="${posts["posts"][k].pathToImage}" width="300px" height="300px">
                                                <h3>${posts["posts"][k].userPosted}</h3>
                                                </div>` );
                    addidNum = addidNum + 1
                    posts["posts"].splice(k,1)
                } else {
                    console.log('not this one')
                }
            }
        }
    }
}