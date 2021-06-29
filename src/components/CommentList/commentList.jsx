import React, { Component }from 'react';
import LikeComment from '../LikeComment/likeComment';
import DislikeComment from '../DislikeComment/dislikeComment';
import ReplyForm from '../ReplyForm/replyForm';
import Replies from '../Replies/replies';

class CommentList extends Component {   
    constructor(props) {
        super(props);
    }
    
    // componentDidMount() {
    //     this.props.getReplies(this.state.commentid);
    // }
    
    render() {
        console.log(this.props.showReplies)
        console.log(this.props.commentId)
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
                    <ReplyForm commentid={comment.id} showReplies={this.getReplies}/>
                    <Replies comment={comment.id} />
                </div>
            ))}
            </div>
        )
    }
}

export default CommentList;