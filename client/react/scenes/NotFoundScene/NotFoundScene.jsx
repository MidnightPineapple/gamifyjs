import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundScene extends Component {

    render() {
        return(
            <div style={styles.content}>
                <i class="fas fa-heart-broken"></i>

                <h1>Oops we couldn't find the page you're looking for.</h1>
                <Link to="/">Back To Homepage</Link>                
            </div>
        )
    }

} 