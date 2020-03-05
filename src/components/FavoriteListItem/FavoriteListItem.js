import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'
import FavoriteList from '../FavoriteList/FavoriteList'

class FavoriteListItem extends Component {

    removeItem = () => {
        this.props.dispatch({
            type: 'DELETE_GIFS',
            payload: this.props.item.id
        })
    }

    render() {
        return (
            <div>
                <img src={this.props.item.url} width="300px"/>
                <button onClick={this.removeItem}>Remove from favorites</button>
            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavoriteListItem);