# test-electron-app

- based on [electron-boilerplate](https://github.com/szwacz/electron-boilerplate)
- uses [electron-builder](https://github.com/electron-userland/electron-builder) for building installers
- uses [nuts](https://github.com/GitbookIO/nuts) as install server

## installlers
- [mac latest](https://shielded-everglades-24834.herokuapp.com/download/osx)
- [win latest](https://shielded-everglades-24834.herokuapp.com/download/win)
- [atom feed](https://shielded-everglades-24834.herokuapp.com/feed/channel/all.atom)

### notes
- update the app
- `GH_TOKEN=c68256567021116dbec8f13b1cf993e6b24c3ba0 node_modules/.bin/build --win --publish onTag`
- `GH_TOKEN=c68256567021116dbec8f13b1cf993e6b24c3ba0 node_modules/.bin/build --mac --publish onTag`
- publish the release
- restart the auto update server

_* you must restart the nuts server to get the latest version._
