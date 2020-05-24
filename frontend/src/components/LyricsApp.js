import React from 'react';
import axios from 'axios';
import SongPanel from './SongPanel';
import LyricsPanel from './LyricsPanel';
import LoginPanel from './LoginPanel';

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
      });
  }

  render() {
    // If we get a song as response, we are logged in
    if (this.state.song.title) {
      const song = this.state.song;
      return (
        <div className="LyricsApp">
          <SongPanel song={song}/>
          <LyricsPanel lyrics={song.lyrics}/>
        </div>
      );
    } else if (this.state.error) {
      const error = this.state.error;
      return (
        <div className="LyricsApp">
          <SongPanel error={error}/>
          <LyricsPanel lyrics={song.lyrics}/>
        </div>
      );
    } else {
      return (
        <div>
          <LoginPanel />
          <LyricsPanel />
        </div>
      );
    }
  }
};

export default LyricsApp;
