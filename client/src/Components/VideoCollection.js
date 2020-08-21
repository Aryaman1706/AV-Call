import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Peer from "peerjs";

import VideoItem from "./VideoItem";
import Controls from "./Controls";

import io from "socket.io-client";

let socket;

const VideoCollection = () => {
  const ENDPOINT = "http://localhost:5000/";
  const roomId = useParams();

  const vidRef = useRef(null);
  const peerStreamRef = useRef([]);
  const [peerStream, setPeerStream] = useState(() => {
    return [];
  });

  const myPeer = new Peer();

  const GenerateVideo = ({ peerStream }) => {
    const ref = useRef(null);
    useEffect(() => {
      ref.current.srcObject = peerStream;
    }, []);
    return <VideoItem vidRef={ref} />;
  };

  const connectToNewUser = (userId, stream) => {
    console.log("New User Arrived");
    var call = myPeer.call(userId, stream);
    call.on("stream", (userStream) => {
      console.log("Connect New User ", userStream);
      setPeerStream((prevArray) => [...prevArray, userStream]);
    });
  };

  useEffect(() => {
    console.log("Peer Stream Array ", peerStream);
    // Init Socket Connection
    socket = io(ENDPOINT);

    // Init peer connection
    myPeer.on("open", (userId) => {
      console.log(userId);
      // Join room
      socket.emit("let_me_in", roomId, userId);
    });

    // Get user media stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {
        console.log("My Video Stream ", mediaStream);
        vidRef.current.srcObject = mediaStream;

        // call setup for peer connection
        myPeer.on("call", (call) => {
          call.answer(mediaStream);
          call.on("stream", (userStream) => {
            console.log("Answer Call ", userStream);
            setPeerStream((peerStream) => [...peerStream, userStream]);
          });
        });

        // Room Joined
        socket.on("i_am_here", (userId) => {
          // Add user's mediaStream
          console.log("Welcome new user :-", userId);
          connectToNewUser(userId, mediaStream);
        });
      });

    socket.on("bye_bye", (userId) => {
      // Remove user's video
      console.log("Bye Bye User ", userId);
    });
  }, []);

  return (
    <Fragment>
      <div className="row" style={{ marginTop: "25px", padding: "15px" }}>
        <VideoItem vidRef={vidRef} />
        {peerStream[0]
          ? peerStream.map((stream) => {
              return <GenerateVideo peerStream={stream} />;
            })
          : null}
      </div>
      {console.log("Peer Stream Array ", peerStream)}
    </Fragment>
  );
};

export default VideoCollection;
