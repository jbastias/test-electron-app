import { remote, BrowserWindow as BrowserWindowElectron} from "electron";
import * as os from "os";
// import BrowserWindow = GitHubElectron.BrowserWindow
// import WebContents = GitHubElectron.WebContents
const { app, autoUpdater, BrowserWindow: BrowserWindowElectron } = remote;

const UPDATE_SERVER_HOST = "shielded-everglades-24834.herokuapp.com"

function isDev() {
  return false
  return app.getPath("exe").includes("/node_modules/electron")
}

export default class AppUpdater {
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
      console.log(`>>> update-downloaded', \nevent: ${event}, \nreleaseNotes: ${releaseNotes}, \nreleaseName: ${releaseName}, \nreleaseDate: ${releaseDate}, \nupdateURL: ${updateURL}`);
    //   notify("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`)
    //   console.log("quitAndInstall")
    //   autoUpdater.quitAndInstall()
    //   return true
    })

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
      console.log('checking for updates...');
      autoUpdater.checkForUpdates()
    })
  }
}

// function notify(title, message) {
//   let windows = BrowserWindowElectron.getAllWindows()
//   if (windows.length == 0) {
//     return
//   }
//
//   windows[0].webContents.send("notify", title, message)
// }
