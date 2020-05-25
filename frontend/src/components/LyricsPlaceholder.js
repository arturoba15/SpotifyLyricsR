import React from 'react';
import ContentLoader from 'react-content-loader';

class LyricsPlaceholder extends React.Component {
  render() {
    return (
    <div className="lyrics">
      <ContentLoader 
        speed={2}
        width={250}
        height={500}
        viewBox="0 0 250 500"
        backgroundColor="#444e64"
        foregroundColor="#373f51"
      >
        <rect x="25" y="29" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="59" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="89" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="119" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="149" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="179" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="209" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="239" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="269" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="299" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="329" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="359" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="389" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="419" rx="5" ry="5" width="250" height="10" /> 
        <rect x="25" y="449" rx="5" ry="5" width="200" height="10" /> 
        <rect x="0" y="479" rx="5" ry="5" width="250" height="10" /> 
      </ContentLoader> 
    </div>
    );
  }
};

export default LyricsPlaceholder;
