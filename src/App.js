import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/searchBar';
import CommentForm from './components/CommentForm/commentForm';
import CommentList from './components/CommentList/commentList';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        comments: [],
        filteredComments: [],
        replies: [],
        // videoId: '',
        videoId: "pquPUX1EihM",
        videoTitle: '',
        videoDescription: '',
        relatedVideos: [],
      }
  }

  componentDidMount() {
    // this.searchVideo('software development')
    this.getComments();
    // this.getReplies();
  }
  
  searchVideo = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=AIzaSyAOtZalV5ZaLSYGPTtfsVexqhBYHBtFfNA`)
    // let relatedVideos = await this.getRelatedVideos(response.data.items[0].id.videoId)
    // .then(this.setState({
      this.setState({
      videoId: response.data.items[0].id.videoId,
      videoTitle: response.data.items[0].snippet.title,
      videoDescription: response.data.items[0].snippet.description,
      // relatedVideos: relatedVideos
    // }))
      })
    console.log(this.state.videoId)
    console.log(this.state.videoTitle)
    console.log(this.state.videoDescription)
  }

  getRelatedVideos = async () => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${this.state.videoId}&type=video&part=snippet&key=AIzaSyAOtZalV5ZaLSYGPTtfsVexqhBYHBtFfNA`)
    this.setState({
      relatedVideos: response.data.items
    })
    console.log(response.data.items)
  }

  getComments = async () => {
    try{
      let response = await axios.get('http://127.0.0.1:8000/comments/')
        // .then( console.log("response is: ", response.data)
          this.setState({
          comments: response.data,
          })
          console.log(response.data)
        // )
        this.filterComments();
    }
    catch (err) {
      console.log(err)
    }
  }

  getReplies = async () => {
    try{
      let response = await axios.get('http://127.0.0.1:8000/reply/')
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

  filterComments = () => {
    let filtered = this.state.comments.filter(comment => comment.video_id.includes(this.state.videoId))
    console.log(this.state.videoId)
    this.setState({
      filteredComments:filtered
    })
    console.log(this.state.filteredComments);
  }

  likeComment = async (id, video_id) => {
    try{
      console.log("like comment function is called")  // test
      await axios.patch(`http://127.0.0.1:8000/comments/${id}/${video_id}/1/`)
      let response = await this.getComments()
      console.log("like comment response")  // test
      if(response === undefined) {
        this.setState({
        })
      }
      else{
        this.setState({
          comments: response.data
        });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  dislikeComment = async (id, video_id) => {
    try{
      console.log("dislike comment function is called")  // test
      await axios.patch(`http://127.0.0.1:8000/comments/${id}/${video_id}/2/`)
      let response = await this.getComments()
      console.log("dislike comment response")  // test
      if(response === undefined) {
        this.setState({
        })
      }
      else{
        this.setState({
          comments: response.data
        });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  render() { 
    return (
      <React.Fragment>
        <h1>YouTube Clone</h1>
        <SearchBar searchVideo={this.searchVideo}/>
          <iframe id="ytplayer" title="title" type="text/html" width="640" height="360"
            src={`https://www.youtube.com/embed/${this.state.videoId}?`}
            frameborder="0"></iframe>
        <h2>{this.state.videoTitle}</h2>
        <h3>{this.state.videoDescription}</h3>
        <CommentForm showComments={this.getComments}/>
        <CommentList allComments={this.state.filteredComments}
        likeComment={this.likeComment} dislikeComment={this.dislikeComment}/>
        {/* <h3>{this.state.relatedVideos}</h3> */}
      </React.Fragment>
    );
  }
}

export default App;