import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        comments: [],
        replies: [],
      }
  }
  
  componentDidMount() {
    this.getComments();
    this.getReplies();
  }

  getComments = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/comments/`)
      this.setState({
        comments: response.data,
      });
    }
    catch (err) {
      console.log(err)
    }
  }

  getReplies = async () => {
    try{
      let response = await axios.get(`http://127.0.0.1:8000/reply/`)
      this.setState({
        replies: response.data,
      });
    }
    catch (err) {
      console.log(err)
    }
  }

  render() { 
    return (
      <div>
        <h1>test</h1>

        <iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe>

      </div>
    );
  }
}

export default App;