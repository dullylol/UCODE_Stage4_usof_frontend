import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

export default class LoginPage extends React.Component {
  state = {
    login: "",
    password: "",
  };

  onChangeLogin = (event) => {
    this.setState({ login: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const api = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        login: this.state.login,
        password: this.state.password,
      },
      url: "http://localhost:8000/api/auth/login",
    };

    console.log(api);
    axios
      .post(api.url, api.data, { headers: api.headers })
      .then(function (response) {
        Cookie.set("user_id", response.data.user.id);
        Cookie.set("token", response.data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        window.location.href = "/";
      })
      .catch(function (error) {
        alert('Incorrect login or password!')
        console.log(error);
      });
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Login"
            onChange={this.onChangeLogin}
            name="login" required
          ></input>
          <br/>
          <input
            type="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            name="password" required
          ></input>
          <br/>
          <input type="submit" value="Sing in"></input>
          <br/>

          <div className="password_reset">
            <Link to="passreset">Password Reset</Link>
          </div>
        </form>
      </div>
    );
  }
}

