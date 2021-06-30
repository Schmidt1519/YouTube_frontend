import React, { Component }from 'react';
import LikeComment from '../LikeComment/likeComment';
import DislikeComment from '../DislikeComment/dislikeComment';
import ReplyForm from '../ReplyForm/replyForm';
import axios from 'axios';

class CommentList extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            commentId: this.props.comment,
            replies: []
        }
    }   
    
    getReplies = async (commentid) => {
        try{
            console.log("get all replies request is called")   // test
            let response = await axios.get(`http://127.0.0.1:8000/comments/reply/${commentid}/`)
            this.setState({
            replies: response.data,
            });
            console.log(this.state.replies)  // test
        }
        catch (err) {
            console.log(err)
        }
    }
    
    render() {
        console.log(this.props.showReplies)  // test
        console.log(this.props.commentId)  // test
        return(
            <div>
            {this.props.filteredComments.map((comment) => (
                <div>
                    <h4>"{comment.comment_text}"</h4>
                    <h6>Likes: {comment.like}</h6>
                    <h6>Dislikes: {comment.dislike}</h6>
                    
                    {this.state.replies.map((reply) => (
                    <p>{reply.reply_text}</p>
                ))}

                    <LikeComment commentid={comment.id} videoid={comment.video_id}
                    likeComment={this.props.likeComment} />
                    <DislikeComment commentid={comment.id} videoid={comment.video_id}
                    dislikeComment={this.props.dislikeComment} />
                    <ReplyForm commentid={comment.id} getReplies={this.getReplies} comment={comment.id}/>
                    {/*= <Replies replies={this.state.replies} /> */}
                </div>
            ))}
            </div>
        )
    }
}

export default CommentList;