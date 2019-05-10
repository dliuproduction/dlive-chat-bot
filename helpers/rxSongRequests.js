const { BehaviorSubject } = require('rxjs');
const storage = require('electron-json-storage');

let rxSongRequests = new BehaviorSubject({});

storage.get('songRequests', (err, data) => {
  if (err) throw err;
  rxSongRequests.next(data);
  rxSongRequests.subscribe(data => {
    storage.set('songRequests', data);
  });
});

module.exports = rxSongRequests;
