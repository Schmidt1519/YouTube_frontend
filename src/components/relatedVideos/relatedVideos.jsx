import React from 'react';

const RelatedVideos = (props) => {

    function videoLinks() {
        return props.relatedVideos.map((video) => {
            return (
                    <ul><a href={`http://www.youtube.com/watch?v=${video.videoId}`}>{video.videoTitle}</a></ul>
            );
        });
    }
        return (
            <div className="container">
                {videoLinks()}
            </div>
        );
}

export default RelatedVideos;