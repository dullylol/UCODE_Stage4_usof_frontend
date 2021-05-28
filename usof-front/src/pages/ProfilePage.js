import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class ProfilePage extends Component {
  state = {
    login: '',
    name: '',
    email: '',
    rating: '',
    role: '',
    created_at: '',
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
      url: `http://127.0.0.1:8000/api/users/${Cookie.get('user_id')}`,
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
        this.setState({ 
          login: user.login, 
          name: user.name, 
          email: user.email, 
          rating: user.rating,
          role: user.role,
          created_at: user.created_at
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!Cookie.get('user_id')) {
      return (
        <div style={styles.head_name}>
        <h3>Please, log in to edit your profile</h3>
      </div>
      )
    }
    return (
      <div>
        <h2 style={styles.head_name}>My profile</h2>
        <form style={styles.form} onSubmit={this.onSubmit}>
        <label style={styles.form_text_view}>Login: </label>
        <input style={styles.input} type='text' value={this.state.login || ''} onChange={this.onChangeLogin}/><br/>
        <label style={styles.form_text_view}>Name: </label>
        <input style={styles.input} type='text' value={this.state.name || ''} onChange={this.onChangeName}/><br/>
        <label style={styles.form_text_view}>Email: </label>
        <input style={styles.input} type='email' value={this.state.email || ''} onChange={this.onChangeEmail}/><br/>
        <input style={styles.button} type='submit' value='Change' />
        </form> <br/>

        <div style={styles.info_block}>
        <label style={styles.text_view}>Role: {this.state.role}</label>
        <label style={styles.text_view}>Rating: {this.state.rating}</label>
        <label style={styles.text_view}>Created at: {new Date(this.state.created_at).toDateString()}</label>
        </div>
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

  //form
  form: {
    background: 'lavender',
    width: '600px',
    height: '290px',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '10px',
    border: '2px solid purple',
    borderRadius: '10px'
  },

  form_text_view: {
    color: 'purple',
    fontSize: '22px',
    textShadow: '1px 1px 1px black, 0 0 1px red',
    padding: '10px',
    width: '75px'
  },

  text_view: {
    color: 'purple',
    fontSize: '22px',
    textShadow: '1px 0px 1px black',
    margin: '0 10px 0 10px'
  },

  info_block: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 100px 0 100px'
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
      marginTop: '8px'
  }

};

