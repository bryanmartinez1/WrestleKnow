import React from "react";
import "./videoPlayer.css";

const VideoPlayer = (props) => {
  let youtube = "https://www.youtube.com/embed/";
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);

  return (
    <div className="videoContainer">
      <h1>On This Day: {dateString} </h1>
      <p>Andrade wins the NXT Championship </p>
      <iframe
        className="ytVid"
        src={youtube + props.vidID}
        title="On This Day"
      />
    </div>
  );
};

export default VideoPlayer;
