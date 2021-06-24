import React, { Component } from 'react';
import axios from 'axios'
import SearchBar from './components/searchBar/searchBar'

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        comments: [],
        replies: [],
        videoId: '',
        videoTitle: '',
        videoDescription: '',
        relatedVideos: [],
      }
  }
  
  searchVideo = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=AIzaSyAOtZalV5ZaLSYGPTtfsVexqhBYHBtFfNA`)
    let relatedVideos = await this.getRelatedVideos(searchQuery)
    this.setState({
      videoId: response.data.items[0].id.videoId,
      videoTitle: response.data.items[0].snippet.title,
      videoDescription: response.data.items[0].snippet.description,
      relatedVideos: relatedVideos
    })
    console.log(this.state.videoTitle)
  }

  getRelatedVideos = async () => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${this.state.videoId}&type=video&part=snippet&key=AIzaSyAOtZalV5ZaLSYGPTtfsVexqhBYHBtFfNA`)
    this.setState({
      relatedVideos: response.data.items
    })
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

  deleteCommentById = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/comments/${id}`)
      await this.getComments()
    }
    catch (err) {
      console.log(err)
    }
  }

  deleteReplyById = async (id) => {
    try{
      await axios.delete(`http://127.0.0.1:8000/reply/${id}`)
      await this.getReplies()
    }
    catch (err) {
      console.log(err)
    }
  }

  render() { 
    return (
      <React.Fragment>
        <SearchBar searchVideo={this.searchVideo}/>
        <div className="container">
        <iframe id="ytplayer" title="title" type="text/html" width="640" height="360"
  src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
  frameborder="0"></iframe>
        
          <h2>{this.state.videoTitle}</h2>
          <h3>{this.state.videoDescription}</h3>
          {/* <h3>{this.state.relatedVideos}</h3> */}
        </div>
      </React.Fragment>
    );
  }
}

export default App;