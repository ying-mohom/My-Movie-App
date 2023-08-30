import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    const renderVideoPlayer = () => {
        if (!videoId) {
            return (
                <div className="noVideoMessage">
                    <span>No Video Available</span>
                </div>
            );
        } else {
            return (
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                />
            );
        }
    };

    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                {renderVideoPlayer()}
            </div>
        </div>
    );
};

export default VideoPopup;
