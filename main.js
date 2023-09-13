const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let userAccounts = require('./users.json');
let userPosts = require('./posts.json')

const createWindow = () => {
  /* browserwindow obj {width,height,attributes,web preferneces}
  win.loadfile used to load the correct html page first
  */
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1000,
    height: 800,
    resizable: false,
    center: true,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
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