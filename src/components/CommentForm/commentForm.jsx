import React, {Component} from 'react';
import axios from 'axios'

class CommentForm extends Component {
    constructor(props) {
        super(props);
            this.state = {
                //     video_id: '',
                //     comment_text: '',
            }
            // this.handleChange = this.handleChange.bind(this); 
            // this.handleSubmit = this.handleSubmit.bind(this); 
    }

    
    addComment = async () => {
        const comment = {
            video_id: this.props.video_id,
            comment_text: this.props.comment_text,
        }
        try{
            console.log("add comment request is called")  // test
            await axios.post(`http://127.0.0.1:8000/comments/`, comment);
            this.props.showComments();
            this.setState({
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    
    handleChange = (event) => {
        console.log("beginning handle change") // test
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("end of handle change") // test
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.addComment();
    }

    render() {
        return(
            <React.Fragment>
                <h1>Comments</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <input type="text" onChange={this.handleChange} value={this.state.name} placeholder="Name"/>
                    </div>
                    <div>
                    <textarea onChange={this.handleChange} value={this.state.comment} placeholder="Comment here"/>    
                    </div>  
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default CommentForm;