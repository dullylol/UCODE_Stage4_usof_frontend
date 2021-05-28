import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie"

export default class CategoriesPage extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/categories`)
      .then((response) => {
        const categories = response.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let categoriesStr = [];

    for (let key in this.state.categories) {
        categoriesStr.push(
        <li style={styles.list_row} key={this.state.categories[key].id} >
          <Link style={styles.post} to="/category" onClick={() => onCategoryClick(this.state.categories[key].id)}>{this.state.categories[key].title}</Link>
        </li>
      )
    }

    return (
      <div>
        <h2 style={styles.head_name}>All categories:</h2>
        <ul style={styles.list}>{categoriesStr}</ul>
      </div>
    );
  }
}

function onCategoryClick(id) {
  Cookie.set('category_id', id)
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
    color: 'black',
    fontSize: '2em',
    textShadow: '1px 1px 1px black',
    border: '1px solid purple',
    borderRadius: '5px',
    background: 'moccasin',
    padding: '10px',
    width: '90%',
    textAlign: "center"
  },

}
