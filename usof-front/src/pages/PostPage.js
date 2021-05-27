import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class PostPage extends Component {
  state = {
    post: [],
    category: [],
    comments: [],
    commentContent: ''
  };

  onChangeCommentContent = (event) => {
    this.setState({ commentContent: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const api = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Bearer ' + Cookie.get('token')
      },
      data: {
        content: this.state.commentContent,
      },
      url: `http://localhost:8000/api/posts/${Cookie.get('post_id')}/comments`,
    };

    console.log(api);
    axios
      .post(api.url, api.data, { headers: api.headers })
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        alert('Cannot create comment!')
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get('post_id')}`)
      .then((response) => {
        const post = response.data;
        this.setState({ post });
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get('post_id')}/category`)
      .then((response) => {
        const category = response.data;
        this.setState({ category });
      })
      .catch((error) => {
        console.log(error);
      });


      axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get('post_id')}/comments`)
      .then((response) => {
        const comments = [];

        response.data.forEach((comment) => {
           comments.push(comment);
        });

        this.setState({comments});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
      console.log(this.state.post);
      console.log(this.state.category);
      console.log(this.state.comments);

      let comments = [];
      console.log(this.state.comments[1])
      this.state.comments.sort((comment1, comment2) => new Date(comment2.created_at).getTime() - new Date(comment1.created_at).getTime())

      for (let key in this.state.comments) {
        comments.push(
          <div key={this.state.comments[key].id} >{this.state.comments[key].content} ({this.state.comments[key].created_at})</div>
        )
      }

      let createComment = (
        <div>
         <form onSubmit={this.onSubmit}>
            <br/>
            <input
              type="text"
              placeholder="Comment"
              onChange={this.onChangeCommentContent}
              name="comment_content" required
            ></input>
            <br/>
            <input type="submit" value="Create comment"></input>
            <br/>
          </form>
      </div>
      )

    return (
      <div>
        <h2>Title: {this.state.post['title']}</h2>
        <div>Content: {this.state.post['content']}</div>
        <div>Category: {this.state.category['title']} - {this.state.category['description']}</div>
        
        <br/>{createComment}<br/>
        
        <div>Comments: {comments}</div>
      </div>
    );
  }
}

//const styles = {};
