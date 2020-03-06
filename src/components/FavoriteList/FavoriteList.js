import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import FavoriteListItem from '../FavoriteListItem/FavoriteListItem'


class FavoriteList extends Component {

    componentDidMount = () => {
        this.getFavorites();
    }

    getFavorites = () => {
        this.props.dispatch({
            type: 'GET_GIFS_FROM_FAVORITES'
        })
    }

    render() {
        return (
            <div>
                <h1>Favorites!</h1><br />
                {this.props.reduxState.favoritesReducer.map((item) => {
                    return (
                        <FavoriteListItem key={item.id} item={item} />
                    );
                })}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavoriteList);