import React from 'react';

function Parallax({image, children}) {
    return (
      <div className="landing-image">
        <div 
        className="background-image side-spacer" 
        style={{backgroundImage: `url(${image})`}}>
        {children}  
        </div>
      </div>
    );
  }
  
  export default Parallax;