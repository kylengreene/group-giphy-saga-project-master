import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import FavoriteList from '../FavoriteList/FavoriteList'
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem'
import { Button } from '@material-ui/core';

class App extends Component {

  state = {
    status: true,
    buttonInjection: 'Favorites',
    pageRender: <SearchForm />
  }

  Flipper = () => {
    if (this.state.status) {
      this.setState({
        status: false,
        buttonInjection: 'Search',
        pageRender: <FavoriteList />
      })
    } else {
      this.setState({
        status: true,
        buttonInjection: 'Favorites',
        pageRender: <SearchForm />
      })
    }
  }

  render() {
    return (
      <div>
        <h1>GIPHY Project</h1>
        <Button onClick={this.Flipper}>{this.state.buttonInjection}</Button>
        {this.state.pageRender}
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(App);
