import React from 'react';

class SongPanel extends React.Component {
 constructor(props) {super(props)}

  render() {
    return (
      <div className="leftPanel">
        <img src={this.props.song.img} alt="Album image" />
        <h1>{this.props.song.title}</h1>
        <h2>{this.props.song.artist}</h2>
      </div>
    );
  }
}

SongPanel.defaultProps = {
  song: {
    title: '',
    artist: '',
    img: ''
  }
};

export default SongPanel;
