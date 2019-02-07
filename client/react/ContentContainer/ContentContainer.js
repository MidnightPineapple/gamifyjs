import React, { Component } from 'react'
import styles from './ContentContainer.css'

export default Content => class ContentContainer extends Component {

    render() {
        return(
            <div className={styles.contentContainer} >
                <Content {...this.props} />
            </div>
        )
    }

}