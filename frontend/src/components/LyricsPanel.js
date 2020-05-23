import React from 'react';

class LyricsPanel extends React.Component {
  render() {
    return (
     <div className="lyrics">
       {this.props.lyrics}
     </div> 
    );
  }
}

LyricsPanel.defaultProps = {
  lyrics: ''
};

export default LyricsPanel;
