const { ipcRenderer } = window;

const send = (channel, cb) => {
  ipcRenderer.send(channel);
  ipcRenderer.on(channel, (event, args) => {
    ipcRenderer.removeAllListeners(channel);
    cb(args);
  });
};

export default send;
