import React, { Component } from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import FavoriteList from '../FavoriteList/FavoriteList'
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem'



class App extends Component {

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
      </div>
    );
  }
  
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
