import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class PostsPage extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/posts`)
      .then((response) => {
        const posts = response.data;
        this.setState({ posts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let postsStr = [];

    for (let key in this.state.posts) {
      postsStr.push(
        <li key={this.state.posts[key].id} >
          <Link to="/post" onClick={() => onPostClick(this.state.posts[key].id)}>{this.state.posts[key].title}</Link>
        </li>
      )
    }

    return (
      <div>
        <h2>All posts:</h2>
        <ul>{postsStr}</ul>
      </div>
    );
  }
}

function onPostClick(id) {
  Cookie.set('post_id', id)
}

//const styles = {};
