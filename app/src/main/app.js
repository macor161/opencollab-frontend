const { app, BrowserWindow, shell, session, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

const extensions = require('../../../extensions');

let isDev;
try {
  isDev = require('electron-is-dev');
} catch(e) {
  isDev = false;
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


/** This function will create the mainWindow */
function createWindow() {
  // Create the browser window.
	win = new BrowserWindow({width: 1210, height: 768});
	
	extensions.loadMetamask(session, win, isDev);

	let indexPath;
  isDev ? indexPath = path.join(`brave/${__dirname}`, 'index.html') : indexPath = path.join(`brave/${__dirname}`, 'index.html');


  setTimeout(() => {
    win.loadURL(url.format({
      pathname: indexPath,
      protocol: 'chrome',
      slashes: true
    }));
    var template = [{
      label: "Edit",
        submenu: [
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" }
      ]}
    ];

    //Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    //win.maximize();
  }, 200);

	ipcMain.on('open-link', (evt, link) => {
    shell.openExternal(link);
  });

  if(process.env.NODE_ENV === 'development') {
		// Open the DevTools.
		win.webContents.openDevTools();
		
		/*
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err));*/

  }

  // Emitted when the window is closed.
  win.on('closed', function() {
	// Dereference the window object, usually you would store windows
	// in an array if your app supports multi windows, this is the time
	// when you should delete the corresponding element.
	win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
		app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
		createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
