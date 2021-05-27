import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class HomePage extends Component {
  state = {
    posts: [],
    title: '',
    content: '',
    category: '',
  };


  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeContent = (event) => {
    this.setState({ content: event.target.value });
  };

  onChangeCategory = (event) => {
    this.setState({ category: event.target.value });
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
        title: this.state.title,
        content: this.state.content,
        category: this.state.category,
      },
      url: 'http://localhost:8000/api/posts',
    };

    console.log(api);
    axios
      .post(api.url, api.data, { headers: api.headers })
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        alert('Cannot create post!')
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/users/${Cookie.get('user_id')}/posts`)
      .then((response) => {
        console.log(response)
        const posts = response.data;
        this.setState({ posts: posts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    if (!Cookie.get('token')) {
      return (
        <div>
          <h2>Main page</h2>
          <h3>To see your posts login to your account</h3>

        </div>
      );
    }

    let postsStr = [];

    for (let key in this.state.posts) {
      postsStr.push(
        <li key={this.state.posts[key].id} >
          <Link to="/post" onClick={() => onPostClick(this.state.posts[key].id)}>{this.state.posts[key].title}</Link>
        </li>
      )
    }

    let createPost = (
      <div>
       <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={this.onChangeTitle}
            name="title" required
          ></input>
          <br/>
          <input
            type="text"
            placeholder="Content"
            onChange={this.onChangeContent}
            name="content" required
          ></input>
          <br/>
          <input
            type="text"
            placeholder="Category"
            onChange={this.onChangeCategory}
            name="category" required
          ></input>
          <br/>
          <input type="submit" value="Create post"></input>
          <br/>
        </form>
    </div>
    )


    return (
      <div>
        <h2>My posts:</h2>
        <ul>{postsStr}</ul>

        <br/>{createPost}<br/>

      </div>
    );
  }
}

function onPostClick(id) {
  Cookie.set('post_id', id)
}

//const styles = {};
