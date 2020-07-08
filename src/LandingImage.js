import React from 'react';
import {FancyH1} from './components/FancyHeading'
import backgroundImg from './img/IMG_0128.png'
import Parallax from './components/Parallax';

function LandingImage() {
    return (
      <Parallax image={backgroundImg}>
        <span style={{height: "40vmin"}} />
          <FancyH1>
            We're Getting Married
          </FancyH1>
          <div className="date">
            - January / 16 / 2021 -
          </div>
      </Parallax>
    );
  }
  
  export default LandingImage;