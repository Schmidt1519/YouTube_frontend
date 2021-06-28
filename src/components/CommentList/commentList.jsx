import React, { Component }from 'react';
import LikeComment from '../LikeComment/likeComment';
import DislikeComment from '../DislikeComment/dislikeComment';
import ReplyForm from '../ReplyForm/replyForm';

class CommentList extends Component {   
    constructor(props) {
        super(props);
            // this.state = {
                // comments: [this.props.allComments],
            // }
    }

    render() {
        return(
            <div>
            {this.props.allComments.map((comment) => (
                <div>
                    <p>{comment.comment_text}</p>
                    <p>{comment.like}</p>
                    <p>{comment.dislike}</p>
                    <LikeComment commentid={comment.id} videoid={comment.video_id}
                    likeComment={this.props.likeComment} />
                    <DislikeComment commentid={comment.id} videoid={comment.video_id}
                    dislikeComment={this.props.dislikeComment} />
                    <ReplyForm commentid={comment.id} showReplies={this.props.getReplies} />
                </div>
            ))}
            </div>
        ) 
    }
}

export default CommentList;