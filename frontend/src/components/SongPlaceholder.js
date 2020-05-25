import React from 'react';
import ContentLoader from 'react-content-loader';

class LoginPanel extends React.Component {
  render() {
    return (
    <div className="leftPanel">
      <ContentLoader 
        speed={2}
        width={300}
        height={530}
        viewBox="0 0 300 530"
        backgroundColor="#434e4f"
        foregroundColor="#293132"
      >
        <rect x="0" y="50" rx="10" ry="10" width="300" height="300" /> 
        <rect x="0" y="400" rx="10" ry="10" width="300" height="30" /> 
        <rect x="50" y="450" rx="10" ry="10" width="200" height="30" />
      </ContentLoader> 
    </div>
    );
  }
};

export default LoginPanel;
