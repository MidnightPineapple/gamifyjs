import React, { Component } from 'react'
import styles from './ContentContainer.css'

export default (Content, containerStyle) => class ContentContainer extends Component {

    render() {
        return(
            <div className={styles.contentContainer} style={containerStyle} >
                <Content {...this.props} />
            </div>
        )
    }

}