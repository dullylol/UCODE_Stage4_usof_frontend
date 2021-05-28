import axios from "axios";
import React from "react";

export default class PasswordReset extends React.Component {
  state = {
    email: "",
    password: "",
  };
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
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
        email: this.state.email,
      },
      url: "http://127.0.0.1:8000/api/auth/password-reset",
    };

    console.log(api);
    axios
      .post(api.url, api.data, { headers: api.headers })
      .then(function (response) {
          alert('Check your email')
        console.log(response);
      })
      .catch(function (error) {
        alert('Oooooppps, error!')
        console.log(error);
      });
  };
  render() {
    return (
      <div className="login">
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={this.onChangeEmail}
            name="email" required
          ></input>
          <br></br>
          <input
            type="submit"
            value="Password Reset"
            id="password_reset"
          ></input>
        </form>
      </div>
    );
  }
}