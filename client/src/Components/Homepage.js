import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Homepage = () => {
  return (
    <Fragment>
      <div className="container">
        <h2>AV-Call</h2>
        <br />
        <br />
        <br />
        <Link to={`/meet/${uuidv4()}`}>Start</Link>
      </div>
    </Fragment>
  );
};

export default Homepage;
