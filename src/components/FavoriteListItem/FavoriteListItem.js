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

    changeCategory = (event, id) => {
        this.props.dispatch({
            type: 'CATEGORIZE_GIFS',
            payload: {
                category_id: event.target.value,
                id: id
            }
        })
    }

    render() {
        return (
            <div>
                <img src={this.props.item.url} width="300px" />
                <button onClick={this.removeItem}>Remove from favorites</button>
                <form onChange={(event) => this.changeCategory(event,this.props.item.id)}>
                    <select>
                        <option value="1">Funny</option>
                        <option value="2">Sports</option>
                        <option value="3">Memes</option>
                        <option value="4">NSFW</option>
                    </select>
                </form>
            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(FavoriteListItem);