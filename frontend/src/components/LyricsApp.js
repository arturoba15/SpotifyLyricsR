import React from 'react';
import axios from 'axios';
import SongPanel from './SongPanel';
import LyricsPanel from './LyricsPanel';
import SongPlaceholder from './SongPlaceholder';
import LyricsPlaceholder from './LyricsPlaceholder';
import ErrorPanel from './ErrorPanel';

class LyricsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {}
    }
  }
  
  componentDidMount() {
    axios.get('/lyrics')    
      .then(res => {
        const song = res.data;
        this.setState({ song });
      })
      .catch(err => {
        const errorMsg = err.response.data.message;
        this.setState(prev => ({
          song: {
          ...prev.song,
          error: errorMsg
          }
        }));
      });
  }

  render() {
    const song = this.state.song;
    if (song.title) {
      return (
        <div className="LyricsApp">
          <SongPanel song={song}/>
          <LyricsPanel lyrics={song.lyrics}/>
        </div>
      );
    } else if (song.error) {
      return (
        <div className="LyricsApp">
          <ErrorPanel error={song.error} />
          <LyricsPanel />
        </div>
      );
    } else {
      return (
        <div>
          <SongPlaceholder />
          <LyricsPlaceholder />
        </div>
      );
    }
  }
};

export default LyricsApp;
