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
    if (sender == 'newest') {
        document.getElementById("bodyTag").onload = newestSort();
    } else if (sender == 'oldest' || sender == 'onLoad') {
        document.getElementById("bodyTag").onload = oldestSort();
    } else if (sender == 'alphaTitle') {
        document.getElementById("bodyTag").onload = alphaTitleSort();
    } else if (sender == 'alphaName') {
        document.getElementById("bodyTag").onload = alphaUserSort();
    } else {
        console.log('not an option')
    }
}

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

    console.log('newest sort')

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null

    sort = 'newestSort()'
    
    if (posts["posts"].length >= 1){ 
        for (i = 0; i < posts["posts"].length; i++) {
                currPostObj = posts["posts"][i]
                console.log(currPostObj)
                $( ".main-container" ).append( `<div class="posts">
                                                <h2><b>${posts["posts"][i].title}</b></h2>
                                                <h3>${posts["posts"][i].year},${posts["posts"][i].time}</h3>
                                                <p>${posts["posts"][i].text}</p>
                                                <h3>${posts["posts"][i].userPosted}</h3>
                                                </div>`);
        } 
    } else {
        $(".main-container").append('<div class="posts"><h1>No posts to display.</h1></div>')
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
    console.log('oldest sort')

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null
    
    if (posts["posts"].length >= 1){ 
        for (i = 0; i < posts["posts"].length; i++) {
                currPostObj = posts["posts"][i]
                console.log(currPostObj)
                $( ".main-container" ).prepend( `<div class="posts">
                                                <h2><b>${posts["posts"][i].title}</b></h2>
                                                <h3>${posts["posts"][i].year},${posts["posts"][i].time}</h3>
                                                <p>${posts["posts"][i].text}</p>
                                                <h3>${posts["posts"][i].userPosted}</h3>
                                                </div>` );
        } 
    } else {
        $(".main-container").append('<div class="posts"><h1>No posts to display.</h1></div>')
    }
}

function alphaTitleSort() {
    console.log('alphatitle test')
}

function alphaUserSort() {
    console.log('alphaname test')
}