import React, { Fragment, useRef } from "react";

const VideoItem = ({ videoRef }) => {
  return (
    <Fragment>
      <div className="col s4" style={{ height: "300px", padding: "15px" }}>
        <video
          ref={videoRef}
          autoPlay
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
    </Fragment>
  );
};

export default VideoItem;
