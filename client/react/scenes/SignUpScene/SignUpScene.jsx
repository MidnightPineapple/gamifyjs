import React, { Component } from 'react'
import contain from '../../ContentContainer'

class SignUpScene extends Component {
    
    constructor() {
        super()
    }
    
    render() {
        return (
            <div>
                Thx for signing up
            </div>
        )
    }
}

export default contain(SignUpScene)
