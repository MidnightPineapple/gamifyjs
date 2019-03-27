import React from 'react'
import PropTypes from 'prop-types'
import styles from './PlayGameButton.css'

const PlayButton = ({ onClick }) => (
    <div onClick={onClick} className={styles.container}>
        Hi from play button
    </div>
)

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}


export default PlayButton