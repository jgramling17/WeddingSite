import React from "react";
import ringImg from "../img/ring.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

const FancyH1 = (props) => {
  return (
    <div className="fancy-h1">
      <h1>{props.children}</h1>
    </div>
  );
};

const FancyH2 = ({ prefixText, suffixText, faIcon }) => {
  return (
    <div className="fancy-h2">
      <h1>
        {prefixText} {faIcon ? (<FontAwesomeIcon icon={faGift} size="1x" />) : (<img src={ringImg} id="ring" />)} {suffixText}
      </h1>
    </div>
  );
};

const FancyH3 = (props) => {
  return (
    <div className="fancy-h3">
      <h3>{props.children}</h3>
    </div>
  );
}

export { FancyH1, FancyH2, FancyH3 };
