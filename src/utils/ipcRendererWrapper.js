const { ipcRenderer } = window;

const send = (channel, cb, data) => {
  ipcRenderer.send(channel, data);
  ipcRenderer.on(channel, (event, args) => {
    cb(args);
    ipcRenderer.removeAllListeners(channel);
  });
};

export default send;
