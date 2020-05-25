import React from 'react';
import axios from 'axios';
import SongPanel from './SongPanel';
import LyricsPanel from './LyricsPanel';
import SongPlaceholder from './SongPlaceholder';
import LyricsPlaceholder from './LyricsPlaceholder';
import ErrorPanel from './ErrorPanel';
import LoginPanel from './LoginPanel';

class LyricsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {},
      data: false,
      loading: true
    }
  }
  
  componentDidMount() {
    this.setState({ loading: true });
    axios.get('/lyrics')    
      .then(res => {
        if (res.data) {
          const song = res.data;
          this.setState({ song, data: true, loading: false });
        } else {
          this.setState({ data: false, loading: false });
        }
      })
      .catch(err => {
        const errorMsg = err.response.data.message;
        this.setState(prev => ({
          song: {
          ...prev.song,
          error: errorMsg
          },
          data: true,
          loading: false
        }));
      });
  }

  render() {
    if (this.state.loading) {
        return (
          <div>
            <SongPlaceholder />
            <LyricsPlaceholder />
          </div>
        );
    } else {
      if (this.state.data) {
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
      } else {
          return (
            <div className="LyricsApp">
              <LoginPanel />
              <LyricsPlaceholder />
            </div>
          );
      }
    }

  }
};

export default LyricsApp;
