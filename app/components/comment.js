import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment, unlikeComment} from '../server.js';

export default class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state={
      likeCounter: props.likeCounter

    }
  }
  render() {
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link> {this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{(this.state.likeCounter.indexOf(4) != -1) ? "Unlike" : "Like"} {this.state.likeCounter.length}</a> · <a href="#">Reply</a> ·
            {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
  handleLikeClick(e){
    e.preventDefault()
    var comment
    if(this.state.likeCounter.indexOf(4) != -1){
      comment = unlikeComment(this.props.feedItemId, this.props.index, 4)

    }
    else{
      comment = likeComment(this.props.feedItemId, this.props.index, 4)
    }
    this.setState({likeCounter:comment.likeCounter})
  }
}
