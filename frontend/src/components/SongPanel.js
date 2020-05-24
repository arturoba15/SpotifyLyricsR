import React from 'react';

class SongPanel extends React.Component {
  render() {
    return (
      <div className="song panel">
        <img src={this.props.song.img} alt="Album image" />
        <h1>{this.props.song.title}</h1>
        <h2>{this.props.song.artist}</h2>
      </div>
    );
  }
}

SongPanel.defaultProps = {
  title: '',
  artist: '',
  img: ''
};

export default SongPanel;
