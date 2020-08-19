import React, { Fragment, useEffect, useState, useRef } from "react";
import VideoItem from "./VideoItem";
import Controls from "./Controls";

const VideoCollection = () => {
  const [myStream, setMyStream] = useState(null);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((myStream) => {
        setMyStream(myStream);
      });
  }, []);

  const videoRef = useRef();
  if (myStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = myStream;
  }
  return (
    <Fragment>
      <div className="row" style={{ marginTop: "25px", padding: "15px" }}>
        <VideoItem videoRef={videoRef} />
      </div>
      <Controls myStream={myStream} setMyStream={setMyStream} />
    </Fragment>
  );
};

export default VideoCollection;
