import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                <h1>Favorite GIFs</h1><br />
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