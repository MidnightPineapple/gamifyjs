import React from 'react'
import PropTypes from 'prop-types'
import styles from './PlayGameButton.css'

const PlayButton = ({ onClick }) => (
    <button onClick={onClick} className={styles.container}>
        Play Game
    </button>
)

PlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}


export default PlayButton