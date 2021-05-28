//import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default function AppHead() {

    let lowMenuBar = (
        <div style={styles.auth}>
            <Link style={styles.menu_bar_links} to='/'>Home</Link>
            <Link style={styles.menu_bar_links} to="/posts">All posts</Link>
            <Link style={styles.menu_bar_links} to="/categories">All categories</Link>
            <Link style={styles.menu_bar_links} to='/users'>All users</Link>
        </div>
    )

    let menuBar = (
        <div style={styles.auth}>
            <Link style={styles.menu_bar_links} to='/'>Home</Link>
            <Link style={styles.menu_bar_links} to='/profile'>Profile</Link>
            <Link style={styles.menu_bar_links} to="/posts">All posts</Link>
            <Link style={styles.menu_bar_links} to="/categories">All categories</Link>
            <Link style={styles.menu_bar_links} to='/users'>All users</Link>
        </div>
    )

    if (!Cookie.get('token')) {
        return (
            <div style={styles.head}>
                <img style={styles.logo} src='./img/logo.png' alt='logo'/>
                <Link to="/" style={styles.linkStyle}><h1 style={styles.headText}>Usof</h1></Link>
                {lowMenuBar}
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
        background: 'linear-gradient(Indigo, #9198e5)',
        border: '3px solid black',
        borderRadius: '0 0 8px 8px ',
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
        wordBreak: 'break-all'
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


    menu_bar_links: {
        color: 'LemonChiffon',
        margin: '10px',
        fontSize: '18px'
    }
  }
