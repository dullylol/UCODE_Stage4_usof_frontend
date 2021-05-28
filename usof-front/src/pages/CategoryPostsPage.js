import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class CategoryPostsPage extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/categories/${Cookie.get('category_id')}/posts`)
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
        <li style={styles.list_row} key={this.state.posts[key].id} >
          <Link style={styles.post} to="/post" onClick={() => onPostClick(this.state.posts[key].id)}>{this.state.posts[key].title}</Link>
        </li>
      )
    }

    return (
      <div>
        <h2 style={styles.head_name}>Category posts:</h2>
        <ul style={styles.list}>{postsStr}</ul>
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
    wordBreak: 'break-all'
  },

}
