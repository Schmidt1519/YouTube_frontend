import React, { Component } from 'react';
import axios from 'axios';
import ReplyForm from '../ReplyForm/replyForm';

class Replies extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            commentId: this.props.comment,
            replies: [],
        }
    }

    componentDidMount() {
        this.getReplies(this.state.commentId);
    }

    getReplies = async (commentid) => {
        try{
            console.log("get all replies request is called")   // test
            let response = await axios.get(`http://127.0.0.1:8000/comments/reply/${commentid}/`)
            this.setState({
            replies: response.data,
            });
            console.log(this.state.replies)
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return(
            <div>
                {this.state.replies.map((reply) => (
                    <p>{reply.reply_text}</p>
                ))}
            </div>
        )
    }
}

export default Replies;