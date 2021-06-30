import React from 'react';

function LikeComment(props){
    return(
        <div>
            <button className="btn btn-success" type="button" onClick={() =>
            props.likeComment(props.commentid, props.videoid)}>Like</button>
        </div>
    )
}

export default LikeComment;