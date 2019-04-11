import React, { Fragment } from 'react'
import contain from '../../ContentContainer'

const ProfileScene = () => (
    <Fragment>
        <h3>Welcome User!</h3>
    </Fragment>
)

export default contain(ProfileScene, { background:"#ddd", color:"#222" })