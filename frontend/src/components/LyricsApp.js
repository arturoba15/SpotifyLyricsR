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
        <>
          <SongPanel song={song}/>
          <LyricsPanel lyrics={song.lyrics}/>
        </>
      );
    } else {
      return (
        <>
          <LoginPanel />
          <LyricsPanel />
        </>
      );
    }
  }
};

export default LyricsApp;
