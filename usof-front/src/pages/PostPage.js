import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Cookie from "js-cookie";

export default class PostPage extends Component {
  state = {
    post: [],
    category: [],
    comments: [],
    commentContent: "",
    postLikes: [],
    postDislikes: [],
    commentLikes: [],
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
        Authorization: "Bearer " + Cookie.get("token"),
      },
      data: {
        content: this.state.commentContent,
      },
      url: `http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/comments`,
    };

    console.log(api);
    axios
      .post(api.url, api.data, { headers: api.headers })
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        alert("Cannot create comment!");
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}`)
      .then((response) => {
        const post = response.data;
        this.setState({ post });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/category`)
      .then((response) => {
        const category = response.data;
        this.setState({ category });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/dislikes`)
      .then((response) => {
        const postDislikes = response.data;
        this.setState({ postDislikes });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/likes`)
      .then((response) => {
        const postLikes = response.data;
        this.setState({ postLikes });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/comments`)
      .then((response) => {
        const comments = [];

        response.data.forEach((comment) => {
          comments.push(comment);
        });

        this.setState({ comments });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let likePost = (
      <input
        style={styles.appraisal}
        type="button"
        value="👍"
        name="postLike"
        onClick={onLikePost}
      />
    );

    let dislikePost = (
      <input
        style={styles.appraisal}
        type="button"
        value="👎"
        name="postDislike"
        onClick={onDislikePost}
      />
    );

    let comments = [];
    this.state.comments.sort(
      (comment1, comment2) =>
        new Date(comment2.created_at).getTime() -
        new Date(comment1.created_at).getTime()
    );

    for (let key in this.state.comments) {
      comments.push(
        <div style={styles.comment_form} key={this.state.comments[key].id}>
          <div style={styles.comment_text}>
            {this.state.comments[key].content}
          </div>
          <div>
            ({new Date(this.state.comments[key].created_at).toDateString()})
          </div>

          <label>
            <input
              style={styles.appraisal}
              type="button"
              value="👍"
              name={this.state.comments[key].id}
              onClick={onLikeComment}
            />
            <input
              style={styles.appraisal}
              type="button"
              value="👎"
              name={this.state.comments[key].id}
              onClick={onDislikeComment}
            />
          </label>

          <br />
        </div>
      );
    }

    let createComment = (
      <div>
        <form style={styles.form} onSubmit={this.onSubmit}>
          <br />
          <input
            style={styles.input}
            type="text"
            placeholder="Comment"
            onChange={this.onChangeCommentContent}
            name="comment_content"
            required
          ></input>
          <br />
          <input style={styles.button} type="submit" value="Create"></input>
        </form>
      </div>
    );

    if (Cookie.get("token")) {
      return (
        <div>
          <div style={styles.post}>
            <h2>
              <label style={styles.head_name}>{this.state.post["title"]}</label>
            </h2>
            <label style={styles.category}>
              {this.state.category["title"]}
            </label>
            <br />
            <label style={styles.content}>{this.state.post["content"]}</label>
            <div>
              <label>
                {this.state.postLikes.length} {likePost} {dislikePost}{" "}
                {this.state.postDislikes.length}
              </label>
            </div>
          </div>

          <br />
          {createComment}
          <br />

          <div>{comments}</div>
        </div>
      );
    }
    return (
      <div>
        <div style={styles.post}>
          <h2>
            <label style={styles.head_name}>{this.state.post["title"]}</label>
          </h2>
          <label style={styles.category}>{this.state.category["title"]}</label>
          <br />
          <label style={styles.content}>{this.state.post["content"]}</label>
          <div>
            <label>
              {this.state.postLikes.length} {likePost} {dislikePost}{" "}
              {this.state.postDislikes.length}
            </label>
          </div>
        </div>

        <div>{comments}</div>
      </div>
    );
  }
}

function onLikePost() {
  const api = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Cookie.get("token"),
    },
    data: {},
    url: `http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/likes`,
  };

  console.log(api);
  axios
    .post(api.url, api.data, { headers: api.headers })
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      alert("Cannot like post!");
      console.log(error);
    });
}

function onDislikePost() {
  const api = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Cookie.get("token"),
    },
    data: {},
    url: `http://127.0.0.1:8000/api/posts/${Cookie.get("post_id")}/dislikes`,
  };

  console.log(api);
  axios
    .post(api.url, api.data, { headers: api.headers })
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      alert("Cannot dislike post!");
      console.log(error);
    });
}

function onLikeComment(event) {
  const api = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Cookie.get("token"),
    },
    data: {},
    url: `http://127.0.0.1:8000/api/comments/${event.target.name}/likes`,
  };

  console.log(api);
  axios
    .post(api.url, api.data, { headers: api.headers })
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      alert("Cannot like comment!");
      console.log(error);
    });
}

function onDislikeComment(event) {
  const api = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Cookie.get("token"),
    },
    data: {},
    url: `http://127.0.0.1:8000/api/comments/${event.target.name}/dislikes`,
  };

  console.log(api);
  axios
    .post(api.url, api.data, { headers: api.headers })
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      alert("Cannot dislike comment!");
      console.log(error);
    });
}

const styles = {
  head_name: {
    textAlign: "center",
    color: "purple",
    fontFamily: "Gill Sans, sans-serif",
    fontSize: "40px",
    ontWeight: "700",
    lineHeight: "30px",
    margin: "0 0 0",
    padding: "20px 30px",
    textAlign: "center",
    textTransform: "uppercase",
    wordBreak: "break-all",
  },

  post: {
    color: "purple",
    fontSize: "2em",
    textShadow: "1px 0 1px black",
    border: "1px solid purple",
    borderRadius: "5px",
    background: "lavender",
    padding: "10px",
    width: "98%",
    margin: "auto",
    marginTop: "1%",
    textAlign: "center",
  },

  //form
  form: {
    background: "lavender",
    width: "300px",
    height: "180px",
    textAlign: "center",
    margin: "auto",
    border: "2px solid purple",
    borderRadius: "10px",
  },

  comment_form: {
    background: "lavender",
    width: "300px",
    textAlign: "center",
    margin: "auto",
    marginTop: "3px",
    marginBottom: "3px",
    padding: "4px",
    border: "2px solid purple",
    borderRadius: "10px",
  },

  comment_text: {
    fontWeight: "bold",
    fontSize: "20px",
    wordBreak: "break-all",
  },

  input: {
    margin: "7px",
    padding: "12px 20px",
    fontSize: "1rem",
    borderWidth: "calc(var(--border-width) * 1px)",
    borderStyle: "solid",
    borderColor: "var(--accent)",
    borderRadius: "calc(var(--border-radius) * 1px)",
    textAlign: "center",
    outline: "transparent",
    transition: "border-color calc(var(--transition, 0.2) * 1s) ease",
  },

  appraisal: {
    border: "none",
    backgroundColor: "lavender",
    fontSize: "30px",
  },

  appraisal_label: {
    border: "none",
    backgroundColor: "thistle",
    fontSize: "30px",
  },

  content: {
    color: "black",
    fontFamily: "fantasy, serif",
    fontSize: "24px",
    wordBreak: "break-all",
  },

  category: {
    border: "1px solid grey",
    borderRadius: "60px",
    padding: "3px 12px 3px 12px",
    background: "mistyRose",
  },

  button: {
    background: "#222",
    height: "50px",
    minWidth: "150px",
    border: "none",
    borderRadius: "10px",
    color: "#eee",
    fontSize: "28px",
    fontFamily: "Cookie, cursive",
    position: "relative",
    transition: "1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    margin: "auto",
    marginTop: "10px",
  },
};
