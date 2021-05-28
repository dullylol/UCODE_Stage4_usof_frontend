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
      url: "http://127.0.0.1:8000/api/auth/login",
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
      <div>
        <h2 style={styles.head_name}>Login</h2>
        <form style={styles.form} onSubmit={this.onSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Login"
            onChange={this.onChangeLogin}
            name="login" required
          ></input>
          <br/>
          <input
           style={styles.input}
            type="password"
            placeholder="Password"
            onChange={this.onChangePassword}
            name="password" required
          ></input>
          <br/>
          <input style={styles.button} type="submit" value="Sing in"></input>
          <br/>

          <div style={styles.post} className="password_reset">
            <Link to="passreset">Password Reset</Link>
          </div>
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
    height: '280px',
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

