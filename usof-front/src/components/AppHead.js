//import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default function AppHead() {
    let menuBar = (
        <div style={styles.auth}>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to="/posts">All posts</Link>
        </div>
    )

    if (!Cookie.get('token')) {
        return (
            <div style={styles.head}>
                <img style={styles.logo} src='./img/logo.png' alt='logo'/>
                <Link to="/" style={styles.linkStyle}><h1 style={styles.headText}>Usof</h1></Link>
                <div style={styles.auth}>
                    <Link style={styles.login} to="/login">Login</Link>
                    <Link style={styles.register} to="/registration">Registration</Link>
                </div>
            </div>
        );
    } else {
        return (
            <>
            <div style={styles.head}>
                <img style={styles.logo} src='./img/logo.png' alt='logo'/>
                <Link to="/" style={styles.linkStyle}><h1 style={styles.headText}>Usof</h1></Link>
            {menuBar}
            <div style={styles.auth}>
                    <Link style={styles.login} to="/" onClick={onLogOut}>Log out</Link>
                </div>
            </div>
            </>
        );
    }
  }

  function onLogOut() {
    Cookie.remove('token')
    Cookie.remove('user_id')
    window.location.reload()
  }
  
  const styles = {
    head: {
        background: 'Indigo',
        border: '3px solid black',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
    },

    logo: {
        maxWidth: '60px',
        maxHeight: '60px'
    },

    linkStyle: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    headText: {
        color: 'LemonChiffon',
        fontFamily: 'Monospace',
        textAlign: 'center',
        fontSize: '3em',
        margin: '10px',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    auth: {
        float: 'right',
        textAlign: 'right',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: '20px',
    },

    login: {
        color: 'LemonChiffon',
        display: 'block'
    },

    register: {
        color: 'LemonChiffon',
        display: 'block'
    },
  }
