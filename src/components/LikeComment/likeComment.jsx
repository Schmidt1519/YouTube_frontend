import React from 'react';

function LikeComment(props){
    return(
        <div>
            <button type="button" onClick={() =>
            props.likeComment(props.commentid, props.videoid)}>Like</button>
        </div>
    )
}

export default LikeComment;