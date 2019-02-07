import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFoundScene extends Component {

    render() {
        return(
            <div>
                Oops we couldn't find the page you're looking for. 
                <Link to="/">Back To Homepage</Link>                
            </div>
        )
    }

} 