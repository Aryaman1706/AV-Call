import React, { Fragment } from "react";

const VideoItem = ({ vidRef }) => {
  return (
    <Fragment>
      <div className="col s4" style={{ height: "300px", padding: "15px" }}>
        <video
          ref={vidRef}
          autoPlay
          muted
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
    </Fragment>
  );
};

export default VideoItem;
