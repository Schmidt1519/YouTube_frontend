import React, { Component }from 'react';

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
                </div>
            ))}
            </div>
        ) 
    }
}

export default CommentList;