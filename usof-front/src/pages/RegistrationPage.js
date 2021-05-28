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
      url: "http://127.0.0.1:8000/api/auth/register",
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
      <h2 style={styles.head_name}>Registration</h2>
        <form style={styles.form} onSubmit={this.onSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Login"
            onChange={this.onChangeLogin}
            name="login" required
          ></input>
          <br></br>
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            name="password" required
          ></input>
          <br></br>
          <input
            style={styles.input}
            type="password"
            placeholder="Repeat password"
            onChange={this.onChangeRepeatPassword}
            name="repeat_password" required
          ></input>
          <br></br>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            onChange={this.onChangeEmail}
            name="email" required
          ></input>
          <br></br>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            onChange={this.onChangeName}
            name="name" required
          ></input>
          <br></br>
          <input style={styles.button} type="submit" value="Sing up"></input>
        </form>
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
    fontSize: '1em',
    textShadow: '1px 0 1px black',
    borderRadius: '5px',
    background: 'lavender',
    textAlign: "center",
    margin: 'auto',
  },

  //form
  form: {
    background: 'lavender',
    width: '310px',
    height: '430px',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '10px',
    border: '2px solid purple',
    borderRadius: '10px',
    marginTop: '1%'
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
      margin: 'auto',
      marginTop: '5px'
  }

};

