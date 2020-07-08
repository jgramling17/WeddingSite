import React, { useState, useEffect } from "react";
import { FancyH2 } from "./components/FancyHeading";
import Button from "@material-ui/core/Button";

function Registry() {
  const [retailers, setRetailers] = useState([]);
  const weddingId = "kelly-henry-and-joel-gramling-jan-2021";
  const fetchUrl = `https://www.theknot.com/us/${weddingId}/registry/retailers`;

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => setRetailers(data));
  }, []);

  return retailers ? (
    <>
      <FancyH2 prefixText={"Gift"} suffixText={"Registry"} faIcon={true} />
      <div className="flex-container flex-row">
        {retailers.map((retailer) => (
          <Retailer retailer={retailer} key={retailer.id} />
        ))}
      </div>
    </>
  ) : null;
}

const Retailer = ({ retailer }) => {
  return (
    <div className="retailer-container flex-column">
      <div
        className="retailer-img"
        style={{ backgroundImage: `url(${retailer.logo})` }}
      />
      <Button
        variant="contained"
        color="primary"
        className={"list-buttons"}
        style={{ minHeight: "50px" }}
        href={retailer.registryUrl}
      >
        View Registry
      </Button>
    </div>
  );
};

export default Registry;
