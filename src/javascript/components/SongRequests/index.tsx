import * as React from 'react';
import { useContext } from 'react';
import YouTube from '@u-wave/react-youtube';
import { ThemeContext } from '../../helpers';
import { setRxSongRequests } from '../../helpers/rxSongRequests';
const styles: any = require('./SongRequests.scss');

const SongRequestsPage = ({ props }) => {
  const { stateTheme, setStateTheme } = useContext(ThemeContext);
  const { songRequests } = props;
  const currentSong = songRequests[0]? songRequests[0]: {id: '', title: ''};

  const deleteSong = (srToDelete) => {
    let sr = songRequests.slice();
    delete sr[sr.indexOf(srToDelete)];
    setRxSongRequests(sr);
  };

  return (
    <div style={stateTheme.menu} className={styles.Points}>
      <div style={stateTheme.menu.title} className={styles.header}>
        SONGREQUESTS
      </div>
      <YouTube
        video={currentSong.id}
        width='640'
        height='390'
        autoplay
        onEnd={() => deleteSong(currentSong)}
      />
      {console.log("in component")}
      {console.log(songRequests)}
      <ul>
        { 
          songRequests.map(sr => 
            <li>
              {sr.id}
              {sr.title}
              <button onClick={() => deleteSong(sr)}>x</button>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export { SongRequestsPage };
