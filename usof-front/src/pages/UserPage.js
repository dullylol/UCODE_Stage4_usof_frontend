import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class UserPage extends Component {
  state = {
    user: [],
  };

  componentDidMount() {

      axios
      .get(`http://127.0.0.1:8000/api/users/${Cookie.get('some_user_id')}`)
      .then((response) => {
        const user = response.data;
        this.setState({ user });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {


    return (
      <div style={styles.post}>
        <h3>Login: {this.state.user['login']}</h3>
        <div>Name: {this.state.user['name']}</div>
        <div>Role: {this.state.user['role']}</div>
        <div>Created at: {new Date(this.state.user['created_at']).toDateString()}</div>
        
      </div>
    );
  }
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

  post: {
    color: 'purple',
    fontSize: '22px',
    textShadow: '1px 0 1px black',
    border: '1px solid purple',
    borderRadius: '5px',
    background: 'lavender',
    padding: '10px',
    margin: 'auto',
    width: '90%',
    textAlign: "center",
    marginTop: '1%'
  },

};
