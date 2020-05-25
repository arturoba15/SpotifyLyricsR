import React from 'react';

class ErrorPanel extends React.Component {
  render() {
    return (
     <div className="leftPanel">
       <div style={{color: "#de4516"}}>Error:</div>
       {this.props.error}
     </div> 
    );
  }
}

export default ErrorPanel;
