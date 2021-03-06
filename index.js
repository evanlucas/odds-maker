'use strict'

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

var mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000
  , height: 800
  , 'node-integration': false
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
