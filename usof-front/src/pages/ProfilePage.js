import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class ProfilePage extends Component {
  state = {
    login: '',
    name: '',
    email: '',
  };

  onChangeLogin = (event) => {
    this.setState({ login: event.target.value });
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
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
        login: this.state.login,
        name: this.state.name,
        email: this.state.email,
      },
      url: `http://localhost:8000/api/users/${Cookie.get('user_id')}`,
    };

    console.log(api);
    axios
      .patch(api.url, api.data, { headers: api.headers })
      .catch(function (error) {
        alert('Cannot change data!')
        console.log(error);
      });
  }

  componentDidMount() {
    if (!Cookie.get('user_id')) {
      return
    }
    axios
      .get(`http://127.0.0.1:8000/api/users/${Cookie.get('user_id')}`)
      .then((response) => {
        const user = response.data;
        this.setState({ login: user.login, name: user.name, email: user.email, });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!Cookie.get('user_id')) {
      return (
        <div>
        <h3>Please, log in to edit your profile</h3>
      </div>
      )
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
        Login: <input type='text' value={this.state.login || ''} onChange={this.onChangeLogin}/> <br/>
        Name: <input type='text' value={this.state.name || ''} onChange={this.onChangeName}/> <br/>
        Email: <input type='email' value={this.state.email || ''} onChange={this.onChangeEmail}/> <br/>
        <input type='submit' value='Change' />
        </form>
      </div>
    );
  }
}


//const styles = {};
