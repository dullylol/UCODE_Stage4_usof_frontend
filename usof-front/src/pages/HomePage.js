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
      url: 'http://127.0.0.1:8000/api/posts',
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
        <div style={styles.post}>
          <h2>Main page</h2>
          <h3>To see your posts login to your account</h3>

        </div>
      );
    }

    let postsStr = [];

    for (let key in this.state.posts) {
      postsStr.push(
        <li style={styles.list_row} key={this.state.posts[key].id} >
          <Link style={styles.post} to="/post" onClick={() => onPostClick(this.state.posts[key].id)}>{this.state.posts[key].title}</Link>
        </li>
      )
    }

    let createPost = (
      <div>
       <form style={styles.form} onSubmit={this.onSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Title"
            onChange={this.onChangeTitle}
            name="title" required
          ></input>
          <br/>
          <input
            style={styles.input}
            type="text"
            placeholder="Content"
            onChange={this.onChangeContent}
            name="content" required
          ></input>
          <br/>
          <input
            style={styles.input}
            type="text"
            placeholder="Category"
            onChange={this.onChangeCategory}
            name="category" required
          ></input>
          <br/>
          <input style={styles.button} type="submit" value="Create post"></input>
          <br/>
        </form>
    </div>
    )


    return (
      <div>
        <h2 style={styles.head_name} >My posts:</h2>
        <ul style={styles.list} >{postsStr}</ul>

        <br/>{createPost}<br/>

      </div>
    );
  }
}

function onPostClick(id) {
  Cookie.set('post_id', id)
}

const styles = {

  head_name: {
    textAlign: 'center',
    color: 'purple',
    fontFamily: 'Gill Sans, sans-serif',
    fontSize: '40px',
    ontWeight: '700',
    lineHeight: '30px',
    margin: '0 0 0',
    padding: '20px 30px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  
  list: {
    listStyleType: 'none',
    margin: '0',
    padding: "0"
  },

  list_row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    margin: '5px',
  },

  post: {
    color: 'purple',
    fontSize: '2em',
    textShadow: '1px 1px 1px black, 0 0 1px red',
    border: '1px solid purple',
    borderRadius: '5px',
    background: 'lavender',
    padding: '10px',
    width: '90%',
    textAlign: "center",
    margin: 'auto',
    marginTop: '1%'
  },

  //form
  form: {
    background: 'lavender',
    width: '310px',
    height: '280px',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '10px',
    border: '2px solid purple',
    borderRadius: '10px'
  },

  input: {
    margin: '7px',
    padding: '12px 20px',
    fontSize: '1rem',
    borderWidth: 'calc(var(--border-width) * 1px)',
    borderStyle: 'solid',
    borderColor: 'var(--accent)',
    borderRadius: 'calc(var(--border-radius) * 1px)',
    textAlign: 'center',
    outline: 'transparent',
    transition: 'border-color calc(var(--transition, 0.2) * 1s) ease',
  },

  button: {
      background: '#222',
      height: '50px',
      minWidth: '150px',
      border: 'none',
      borderRadius: '10px',
      color: '#eee',
      fontSize: '28px',
      fontFamily: 'Cookie, cursive',
      position: 'relative',
      transition: '1s',
      webkitTapHighlightColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      margin: 'auto'
  }

};
