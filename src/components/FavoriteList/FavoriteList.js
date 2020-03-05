import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem'


class FavoriteList extends Component {

    render() {
        return (
            <div>
                <h1>Favorite GIFs</h1>
                
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavoriteList);