import React from "react";
import {FancyH3} from "./FancyHeading"

const Milestones = ({ milestones }) => {
  return milestones.map((milestone, i) => {
    /* const isEven = i % 2;
    return (
      <div className="milestone">
        {isEven ? <p className="flex-item">{milestone.story}</p> : null}
        <img src={milestone.image} className="flex-item"/>
        {!isEven ? <p className="flex-item">{milestone.story}</p> : null}
      </div> */
    return (
      <span className="milestone flex-row">
        <img src={milestone.image} className="flex-item" />
        <span className="flex-container flex-row fixed-height">
            <div className="date-bubble">
                <div className="day">{milestone.date.getDate()}</div>
                <div className="month-year">
                {milestone.date.getMonth() + 1}
                .
                {milestone.date.getFullYear().toString().substr(2,4)}
                </div>
            </div>
        </span>
        <FancyH3>{milestone.title}</FancyH3>
        <p className="flex-item">{milestone.story}</p>
      </span>
    );
  });
};

const TimeLine = ({ milestones }) => {
  return (
    <div className="flex-container flex-column side-spacer">
      <Milestones milestones={milestones} />
    </div>
  );
};

export default TimeLine;
