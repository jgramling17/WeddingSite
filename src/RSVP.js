import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { FancyH1 } from "./components/FancyHeading";
import backgroundImg from "./img/IMG_0128.png";
import Parallax from "./components/Parallax";

function RSVP() {
  return (
    <Parallax image={backgroundImg}>
      <FancyH1>Are you attending?</FancyH1>
      <Link to="/rsvp">
        <Button variant="contained" size="large" color="secondary">
          RSVP
        </Button>
      </Link>
    </Parallax>
  );
}

export default RSVP;
