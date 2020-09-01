import React, { Fragment } from "react";

const Controls = ({ myStream }) => {
  const video = (e) => {
    e.preventDefault();
    myStream.getVideoTracks()[0].enabled = !myStream.getVideoTracks()[0]
      .enabled;
  };

  const audio = (e) => {
    e.preventDefault();
    myStream.getAudioTracks()[0].enabled = !myStream.getAudioTracks()[0]
      .enabled;
  };

  return (
    <Fragment>
      <div className="row">
        <div className="center-align">
          <button onClick={video}>Video</button>
          <button onClick={audio}>Audio</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Controls;
