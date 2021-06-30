import React from 'react';

function DislikeComment(props){
    return(
        <div>
            <button className="btn btn-danger" type="button" onClick={() =>
            props.dislikeComment(props.commentid, props.videoid)}>Dislike</button>
        </div>
    )
}

export default DislikeComment;