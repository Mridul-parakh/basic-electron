const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let imageWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680,webPreferences:{webSecurity:false,nodeIntegration:true}});
  imageWindow = new BrowserWindow({width: 600, height: 600,parent:mainWindow,show:false,webPreferences:{nodeIntegration:true}});
  
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  imageWindow.loadURL(isDev ? 'http://localhost:3000/image' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null); 
  imageWindow.on('close',(e)=>{
      e.preventDefault();
     // imageWindow = null;
      imageWindow.hide();
    })
//     mainWindow.webContents.openDevTools();
//     mainWindow.webContents.on("devtools-opened", () => {
//     mainWindow.webContents.closeDevTools();
//  });

//   imageWindow.on('closed', (e) => 
//   {
//       e.preventDefault();
//       imageWindow.hide();
//     }); 
}

app.on('ready', createWindow);
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('toggle-image', (event, arg) => {
    imageWindow.show();
    imageWindow.webContents.send('image', arg);
  })