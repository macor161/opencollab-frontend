export class Intertron {

    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer
    }

    send(method, ...args) {
      const repId = this.ipcRenderer.sendSync(method, ...args)
      return new Promise((resolve, reject) => {
        this.ipcRenderer.on(repId, (e, data) => {
          resolve(data)
        })
      })
    }
  }
  

  