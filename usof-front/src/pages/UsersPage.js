import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class UsersPage extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/users`)
      .then((response) => {
        const users = response.data;
        this.setState({ users });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let usersStr = [];

    for (let key in this.state.users) {
        usersStr.push(
        <li style={styles.list_row} key={this.state.users[key].id} >
          <Link style={styles.post} to="/user" onClick={() => onUsersClick(this.state.users[key].id)}>{this.state.users[key].login}</Link>
        </li>
      )
    }

    return (
      <div>
        <h2 style={styles.head_name}>All users:</h2>
        <ul style={styles.list}>{usersStr}</ul>
      </div>
    );
  }
}

function onUsersClick(id) {
  Cookie.set('some_user_id', id)
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
    color: 'black',
    fontSize: '2em',
    textShadow: '1px 1px 1px black',
    border: '1px solid purple',
    borderRadius: '5px',
    background: 'darkSalmon',
    padding: '10px',
    width: '90%',
    textAlign: "center"
  },

}

