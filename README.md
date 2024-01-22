<h1>Electro</h1>

Computer Science NEA project, social media forums platform with image handling and long term data storage in database like format.

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Electro</title>
    <link rel="stylesheet" href="styles.css">
    <script src="./renderer.js"></script>
    <script src="index.js"></script>
    <script src="createpost.js"></script>
    <script src="displayPost.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="sorting.js"></script>
  </head>
  <body id="bodyTag" onload="sorter('onLoad')">
    <script type="module" src="./index.js"></script>
    <div class="topnav" onload="">
      <table>
        <tr>
          <th style="width: 100px; height: 50px;align-self: center;padding-left: 5px;padding-top: 5px;"><img src="assets/Placeholder logo.png" alt="placeholder logo"></th>
          <th>
            <div class="search-container">
                <form>
                  <button type="submit" style="float: right;"><img src="assets/searchIcon.png" alt="search icon magnifying glass" width="46px" height="45px"></button>
                  <input type="text" placeholder="THIS DOES NOTHING RN :3 THANK YOU FOR YOUR PATIENCE" name="search" style="width: 580px;float: right; height: 50px;margin-top: 1px;">
                </form>
            </div>
          </th>
          <th style="width: 200px; height: 50px;"><button class="login-button" id="button" onclick="document.location.href='./login.html'">Logout</button></th>
        </tr>
      </table>
    </div>  
    <div class="main-section">
      <table>
        <tr>
          <th style="width: 800px; height: 640px;">
            <button id="createbutton" onclick="document.location.href='./createPost.html'">Add post</button>
              <div class="dropdown">
                <button class="dropbtn">Sort By</button>
                <div class="dropdown-content">
                  <a onclick="sorter('newest')">Newest</a>
                  <a onclick="sorter('oldest')">Oldest</a>
                  <a onclick="sorter('alphaTitle')">Alphabetical (Title)</a>
                  <a onclick="sorter('alphaName')">Alphabetical (User Posted)</a>
                </div>
              </div>
            <div class="main-container" id="main-container">
            </div>
          </th>
        </tr>
      </table>
    </div>
    <div class="footer">
      <table>
        <tr>
          <th style="width: 974px;height: 50px;"><p style="float: left;padding-left: 15px;">Copyright © 2023 Reece Wilkinson Inc. All rights reserved.</p><p style="float: right;padding-right: 15px;">United Kingdom</p></th>
        </tr>
      </table>
    </div>
  </body>
</html>
