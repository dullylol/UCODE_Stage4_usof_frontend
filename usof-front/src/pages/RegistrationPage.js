import React from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
//import Cookie from "js-cookie";

export default class Registration extends React.Component {
  state = {
    email: "",
    password: "",
    repeatPassword: "",
    login: "",
    name: "",
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onChangeLogin = (event) => {
    this.setState({ login: event.target.value });
  };
  onChangeRepeatPassword = (event) => {
    this.setState({ repeatPassword: event.target.value });
  };
  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };
  onSubmit = (event) => {
    event.preventDefault();

    const api = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        email: this.state.email,
        password: this.state.password,
        login: this.state.login,
        name: this.state.name,
      },
      url: "http://localhost:8000/api/auth/register",
    };
    if (this.state.password === this.state.repeatPassword) {
      console.log(api)
      axios
        .post(api.url, api.data, { headers: api.headers })
        .then(function (response) {
          window.location.href = "/login";
        })
        .catch(function (error) {
          alert('Error!')
          console.log(error);
        });
    } else {
      alert('Passsword mismatch!')
    }
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
          <br></br>
          <input
            type="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            name="password" required
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="Repeat password"
            onChange={this.onChangeRepeatPassword}
            name="repeat_password" required
          ></input>
          <br></br>
          <input
            type="email"
            placeholder="Email"
            onChange={this.onChangeEmail}
            name="email" required
          ></input>
          <br></br>
          <input
            type="text"
            placeholder="Name"
            onChange={this.onChangeName}
            name="name" required
          ></input>
          <br></br>
          <input type="submit" value="Sing up"></input>
        </form>
      </div>
    );
  }
}
