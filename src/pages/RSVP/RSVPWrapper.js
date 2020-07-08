import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FancyH1, FancyH3 } from "../../components/FancyHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSyncAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";

function RSVPWrapper() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [partialMatches, setPartialMatches] = useState([]);
  const [fullMatch, setFullMatch] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const history = useHistory();
  const weddingId = "209993cc-94ac-4284-9265-9927382729f2";
  const fetchUrl = `https://api.guests.xogrp.com/v1/weddings/${weddingId}/guests?full_name=`;
  const eventUrl = `https://api.guests.xogrp.com/v1/weddings/${weddingId}/events`;
  const patchUrl = `https://api.guests.xogrp.com/v1/weddings/${weddingId}/households/`;

  useEffect(() => {
    fetch(eventUrl)
      .then((res) => res.json())
      .then((data) => setEventData(data));
  }, []);

  function handlePartialMatchClick(id) {
    const newMatch = partialMatches.find((x) => x.id === id);
    setFullMatch(newMatch);
    isReadyToSubmit(newMatch.people);
    setNotes(newMatch.answers ? newMatch.answers[0].text : "");
    setPartialMatches([]);
  }

  function isReadyToSubmit(matchPeople) {
    const readyToSubmit = matchPeople.reduce(
      (ready, people) => ready && people.invitations[0].rsvp != null,
      true
    );
    setCanSubmit(readyToSubmit);
  }

  function handleRsvp(peopleId, accepted) {
    const newPeople = fullMatch.people.map((people) => {
      if (people.id === peopleId) {
        people.invitations[0] = { ...people.invitations[0], rsvp: accepted };
      }
      return people;
    });
    let newMatch = { ...fullMatch };
    newMatch.people = newPeople;
    setFullMatch(newMatch);
    //Not completely necessary, just to account for user error of non-submits
    submitRsvp();
    isReadyToSubmit(newMatch.people);
  }

  async function submitRsvp(e) {
    const uuid = v4();
    let payload = {
      answers: [
        { questionId: eventData.guestWeddingQuestions[0].id, text: notes },
      ],
      people: fullMatch.people,
      weddingId: weddingId,
    };
    axios.patch(`${patchUrl}${fullMatch.id}`, payload, {
      headers: { "X-MEMBER-UUID": uuid },
    });
    if (e && e.type === "submit") {
      e.preventDefault();
      history.push("/");
    }
  }

  return (
    <div>
      <form
        className="flex-container flex-column side-spacer"
        onSubmit={(e) =>
          submitSearch(
            e,
            name,
            setPartialMatches,
            setFullMatch,
            setLoading,
            fetchUrl
          )
        }
      >
        <div className="flex-container flex-row side-spacer">
          <FancyH1>Find Your Invitation</FancyH1>
        </div>
        <div className="flex-container flex-row space-bottom side-spacer">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            autoComplete={"off"}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="outlined" color="secondary" type="submit">
            Search
          </Button>
        </div>
      </form>
      <Loader isLoading={isLoading} />
      <PartialMatches
        matches={partialMatches}
        handleClick={handlePartialMatchClick}
      />
      <FullMatch
        match={fullMatch}
        handleRsvp={handleRsvp}
        notes={notes}
        setNotes={setNotes}
        submitRsvp={submitRsvp}
        canSubmit={canSubmit}
      />
    </div>
  );
}

async function submitSearch(
  event,
  query,
  setPartialMatches,
  setFullMatch,
  setLoading,
  fetchUrl
) {
  event.preventDefault();
  setPartialMatches([]);
  setFullMatch(null);
  if (query) {
    setLoading(true);
    var response;
    await fetch(`${fetchUrl}${query}`)
      .then((res) => res.json())
      .then((data) => (response = data));
    setLoading(false);
    setPartialMatches(response.partialMatches ?? []);
    setFullMatch(response.exactMatch ?? null);
    console.log(response);
  }
}

const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div className="flex-container flex-row side-spacer">
      <FontAwesomeIcon icon={faSyncAlt} spin size="lg" />
    </div>
  ) : null;
};

const PartialMatches = React.memo(({ matches, handleClick }) => {
  if (matches && Array.isArray(matches)) {
    return (
      <div className="flex-container flex-row side-spacer">
        <div className="flex-container flex-column">
          {matches.map((match) => {
            var displayName = `${match.people[0].firstName} ${
              match.people[0].lastName
            } ${match.people[1] ? " + " + (match.people.length - 1) : ""}`;
            return (
              <Button
                variant="contained"
                color="primary"
                key={match.id}
                className={"list-buttons"}
                endIcon={<FontAwesomeIcon icon={faArrowRight} />}
                onClick={() => handleClick(match.id)}
              >
                {displayName}
              </Button>
            );
          })}
        </div>
      </div>
    );
  } else return null;
});

const FullMatch = React.memo(
  ({ match, handleRsvp, notes, setNotes, submitRsvp, canSubmit }) => {
    return match ? (
      <div className="flex-container flex-column side-spacer">
        <div className="flex-container flex-column side-spacer space-bottom">
          {match.people.map((people) => (
            <div key={people.id}>
              <FancyH3>{`${people.firstName} ${people.lastName}`}</FancyH3>
              <div className="flex-container flex-row">
                <Button
                  variant={
                    !people.invitations[0].rsvp ? "outlined" : "contained"
                  }
                  color="secondary"
                  onClick={() => handleRsvp(people.id, true)}
                >
                  Accept
                </Button>
                <Button
                  variant={
                    people.invitations[0].rsvp !== false
                      ? "outlined"
                      : "contained"
                  }
                  color="secondary"
                  onClick={() => handleRsvp(people.id, false)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={submitRsvp}
          className="flex-container flex-column submit-rsvp-form"
        >
          <TextField
            label="Add a Note for Us!"
            value={notes}
            variant="outlined"
            autoComplete={"off"}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            key={match.id}
            className={"list-buttons"}
            endIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            type="submit"
            disabled={!canSubmit}
            style={{ minHeight: "50px" }}
          >
            Submit RSVP
          </Button>
        </form>
      </div>
    ) : null;
  }
);

export default RSVPWrapper;
