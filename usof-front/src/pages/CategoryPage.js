import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class CategoryPage extends Component {
  state = {
    category: [],
  };

  componentDidMount() {

      axios
      .get(`http://127.0.0.1:8000/api/categories/${Cookie.get('category_id')}`)
      .then((response) => {
        const category = response.data;
        this.setState({ category });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {


    return (
      <div>
        <Link to='/category-posts'><h3 style={styles.head_name}>{this.state.category['title']}</h3></Link>
        <div style={styles.post}>{this.state.category['description']}</div>
        
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
    textAlign: "center"
  },

};
