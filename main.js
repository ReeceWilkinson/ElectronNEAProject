const { app, BrowserWindow, ipcMain,dialog } = require('electron')
const path = require('path')

let userAccounts = require('./users.json');
let userPosts = require('./posts.json')

const createWindow = () => {
  /** 
  * creates the window that the software and html will be displayed on.
  * creates an object 'BrowserWindow' with attributes to run based on.
  *
  * returns a window for the html code to be displayed on.
  */
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1000,
    height: 800,
    resizable: false,
    center: true,
    icon: 'assets/icons8-electric-67.png',
    roundedCorners: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation:false,
      enableRemoteModule: false
    }
  })

  win.loadFile('login.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})