(function () {'use strict';

var electron = require('electron');
var os = require('os');

// import BrowserWindow = GitHubElectron.BrowserWindow
// import WebContents = GitHubElectron.WebContents
const { app, autoUpdater, BrowserWindow: BrowserWindowElectron } = electron.remote;

const UPDATE_SERVER_HOST = "shielded-everglades-24834.herokuapp.com"

function isDev() {
  return false
  return app.getPath("exe").includes("/node_modules/electron")
}

class AppUpdater {
  constructor(win) {
    if (isDev()) {
      console.log('in dev mode');
      return
    }

    const platform = os.platform()
    if (platform === "linux") {
      return
    }

    const version = app.getVersion()

    autoUpdater.addListener("update-available", (event) => {
      console.log("A new update is available", event)
    })

    autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
      notify("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`)
      console.log("quitAndInstall")
      autoUpdater.quitAndInstall()
      return true
    })

    autoUpdater.addListener("error", (error) => {
      console.log('wtf son');
      console.log('raw: ', error)
      console.log('toString: ', error.toString())
      console.log('JSON: ', JSON.stringify(error, null, 2))
      Object.keys(error).forEach( key =>
          console.log(key, error[key])
      )
    //   throw error;
    })

    autoUpdater.addListener("checking-for-update", (event) => {
      console.log('wtf son');
      console.log("checking-for-update", event)
    })

    autoUpdater.addListener("update-not-available", () => {
      console.log("update-not-available")
    })

    if (platform === "darwin") {
      autoUpdater.setFeedURL(`https://${UPDATE_SERVER_HOST}/update/${platform}_${os.arch()}/${version}`)
    }

    win.webContents.once("did-frame-finish-load", (event) => {
      autoUpdater.checkForUpdates()
    })
  }
}

function notify(title, message) {
  let windows = BrowserWindowElectron.getAllWindows()
  if (windows.length == 0) {
    return
  }

  windows[0].webContents.send("notify", title, message)
}

module.exports = AppUpdater;
}());
//# sourceMappingURL=app-updater.js.map