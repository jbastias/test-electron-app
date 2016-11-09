(function () {'use strict';

var electron = require('electron');
var os = require('os');

// import BrowserWindow = GitHubElectron.BrowserWindow
// import WebContents = GitHubElectron.WebContents
const { app, autoUpdater, Notification, BrowserWindow: BrowserWindowElectron } = electron.remote;

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
      console.log("A new update is available")
    })

    autoUpdater.addListener("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateURL, quitAndInstall) {
      const ud = confirm(`Version ${releaseName} is downloaded and will be automatically installed on Quit`);
      if (ud) {
        quitAndInstall();
      }
      console.log('me so solly');
    })

    // autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    //   const args = Array.from(arguments);
    //   console.log('args looking for function: ', JSON.stringify(args));
    //   console.log('args length: ', args.length);
    //   console.log('args last item: ', typeof args[args.length - 1]);
    //   const ud = confirm(`Version ${releaseName} is downloaded and will be automatically installed on Quit`);
    //   if (ud) {
    //     setTimeout(() => {
    //       autoUpdater.quitAndInstall();
    //       return true
    //   }, 10000);
    //   }
    //   false
    // })


    autoUpdater.addListener("error", (error) => {
      console.log(JSON.stringify(error, null, 2))
    })

    autoUpdater.addListener("checking-for-update", (event) => {
      console.log("checking-for-update")
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

module.exports = AppUpdater;
}());
//# sourceMappingURL=app-updater.js.map