window.$ = window.jQuery = require('jquery');
const globalShortcut = electron.globalShortcut

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
        newestSort()
    } else if (sender == 'oldest') {
        oldestSort()
    } else if (sender == 'alphaTitle') {
        alphaTitleSort()
    } else if (sender == 'alphaName') {
        alphaUserSort()
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
    
    mainWindow.reload()

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null

    sort = 'newestSort()'
    
    if (posts["posts"].length >= 1){ 
        for (i = 0; i < posts["posts"].length; i++) {
                currPostObj = posts["posts"][i]
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

    let postsjson = fs.readFileSync("posts.json", "utf-8");

    let posts = JSON.parse(postsjson);

    let currPostObj = null
    
    if (posts["posts"].length >= 1){ 
        for (i = 0; i < posts["posts"].length; i++) {
                currPostObj = posts["posts"][i]
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