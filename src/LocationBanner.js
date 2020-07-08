import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGlassMartini,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FancyH1, FancyH3 } from "./components/FancyHeading";
import backgroundImg from "./img/IMG_6097.png";
import Parallax from "./components/Parallax";

const locationContent = [
  {
    title: "Cerimony",
    info: "St. Paul's Cathedral, January 16th 2021, 4:00pm, Cocktail Attire.",
    icon: faBell,
  },
  {
    title: "Reception",
    info:
      "Omni William Penn Hotel, January 16th 2021, 530 William Penn Place, Pittsburgh, PA, 15219-0000.",
    icon: faGlassMartini,
  },
  {
    title: "Accomidation",
    info: "Omni William Penn Hotel, Parking is across the street.",
    icon: faBed,
  },
];

function LocationBanner() {
  return (
    <Parallax
      image={
        "https://i.pinimg.com/originals/16/67/6f/16676fdc43120c3d4f46ad89c869314b.jpg"
      }
    >
      <FancyH1>{"When & Where"}</FancyH1>
      <LocationInfo content={locationContent} />
    </Parallax>
  );
}

const LocationInfo = ({ content }) => (
  <div className="flex-container flex-row">
    <div className="flex-container flex-column">
      {content.map((blurb) => (
        <LocationBlurb blurb={blurb} />
      ))}
    </div>
    <div>MAPSTUFF</div>
  </div>
);

const LocationBlurb = ({ blurb }) => (
  <div className="flex-container flex-column">
    <div className="flex-container flex-row">
      <FontAwesomeIcon icon={blurb.icon} spin size="lg" />
      <FancyH3>{blurb.title}</FancyH3>
    </div>
    <p>{blurb.info}</p>
  </div>
);

export default LocationBanner;
