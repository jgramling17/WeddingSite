import React from "react";
import { FancyH2 } from "./components/FancyHeading";
import Timeline from "./components/Timeline";
import tlImg1 from "./img/timeline/img1.jpeg";
import tlImg2 from "./img/timeline/img2.jpeg";
import tlImg3 from "./img/timeline/img3.jpeg";

const timelineImages = [tlImg1, tlImg2, tlImg3];
const timelineDates = [new Date(2015, 1, 1), new Date(2017, 1, 1), new Date(2019, 1, 1)]
const timelineTitles = ["How They Met", "College & Dating", "Proposal"];
const timelineStory = [
  `Joel and Kelly have been friends a majority of their 
  life. They first met in 4 year old little league T-ball. 
  They always ran around in the same friend group and became 
  close friends in high school. Their senior year they both 
  decided to attend John Carroll University for college. `,
  `They both felt a major relief to have each other with 
  such a huge life change ahead. As freshman year moved 
  along they became inseparable. Kelly transferred colleges 
  after their freshman year yet being in different states 
  didn’t change a thing. Fast forward to their Junior year, 
  they finally started to date! It had been a long time coming. 
  Their parents and friends weren’t surprised at all when the 
  news came out, most of them were actually relieved! The most 
  anticipated love story had finally taken a leap of faith. `,
  `They dated for about four years until Joel popped the question 
  on a cold December night at Phipps Botanical Garden during 
  their winter festival. Kelly of course said yes! It’s very 
  rare to find such a true best friend let alone a life partner 
  these two couldn’t be more of a match. Just as Kelly says 
  to Joel, “I always knew it was you"`, 
];

const paragraphText = `FIX ME`;

const ImageToMileStone = () => {
  return timelineImages.map((img, i) => {
    return { 
      image: img,
      title: timelineTitles[i],
      date: timelineDates[i],
      story: timelineStory[i] 
    };
  });
};

function OurStory() {
  return (
    <>
      <div className="side-spacer container container-text">
        <FancyH2 prefixText={"Our"} suffixText={"Story"} />
        <p>{paragraphText}</p>
      </div>
      <spacer />
      <Timeline milestones={ImageToMileStone()} />
    </>
  );
}

export default OurStory;
