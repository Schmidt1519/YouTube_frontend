import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/searchBar/searchBar';
import CommentForm from './components/CommentForm/commentForm';
import CommentList from './components/CommentList/commentList';
import RelatedVideos from './components/relatedVideos/relatedVideos'
import ReplyForm from './components/ReplyForm/replyForm';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        comments: [],
        filteredComments: [],
        filteredReplies: [],   // needed?
        replies: [],   // needed?
        // videoId: '',
        videoId: "pp4YQPykBMM",
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
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=AIzaSyAIfh92bqWo0T_AbXjELe4jIF2iDLZvb18`);
    let allVideos = response.data;
    console.log(response.data)
    // this.setState({
    //   videoId: response.data.items[0].id.videoId,
    //   videoTitle: response.data.items[0].snippet.title,
    //   videoDescription: response.data.items[0].snippet.description,
    this.getRelatedVideos({
      videoId: allVideos.items[0].id.videoId,
      videoTitle: allVideos.items[0].snippet.title,
      videoDescription: allVideos.items[0].snippet.description,
    })
    // console.log(response.data)
    // console.log(videoId)
    // console.log(videoTitle)
    // console.log(videoDescription)
  }

  getRelatedVideos = async (videoData) => { 
    let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoData.videoId}&type=video&part=snippet&key=AIzaSyAIfh92bqWo0T_AbXjELe4jIF2iDLZvb18`);
    let relatedVideos = response.data.items.filter(video => video.snippet);
    let relatedVideosArray = relatedVideos.map((video) => {
      return ({
          videoId: video.id.videoId,
          videoTitle: video.snippet.title,});
      });
      this.setState({
        videoId: videoData.videoId,
        videoTitle: videoData.videoTitle,
        videoDescription: videoData.videoDescription,
        relatedVideos: relatedVideosArray
    })
  }

  getComments = async () => {
    try{
      console.log("get all comments request is called")   // test
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
      console.log("get all replies request is called")   // test
      let response = await axios.get('http://127.0.0.1:8000/comments/reply/')
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

  // filterReplies = () => {
  //   let filtered = this.state.replies.filter(reply => reply.video_id.includes(this.state.videoId))
  //   console.log(this.state.videoId)
  //   this.setState({
  //     filteredReplies:filtered
  //   })
  //   console.log(this.state.filteredReplies);
  // }

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
        <RelatedVideos relatedVideos={this.state.relatedVideos} />
        <CommentForm showComments={this.getComments} videoId={this.state.videoId}/>
        <CommentList allComments={this.state.filteredComments}
        likeComment={this.likeComment} dislikeComment={this.dislikeComment}
        showReplies={this.getReplies} />
      </React.Fragment>
    );
  }
}

export default App;