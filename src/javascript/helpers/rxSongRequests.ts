import { BehaviorSubject } from 'rxjs';

const Window: any = window;
const { ipcRenderer } = Window.require('electron');

const rxSongRequests = new BehaviorSubject({});

ipcRenderer.send('getRxSongRequests');
ipcRenderer.on('RxSongRequests', (event, songRequests) => {
  console.log(songRequests)
  rxSongRequests.next(songRequests);
});

const setRxSongRequests = songRequests => {
  ipcRenderer.send('setRxSongRequests', songRequests);
};

export { rxSongRequests, setRxSongRequests };
