import React, { Fragment } from 'react'
import Chart from './Chart';
import PlayGameButton from './PlayGameButton'
import contain from '../../ContentContainer'

const sampleData = [
    { x:1, y:2 }, 
    { x:2, y:3 }, 
    { x:3, y:5 }, 
    { x:4, y:6 }, 
    { x:5, y:20 }, 
]

const DashboardScene = ({ history }) => (
    <Fragment>
        <Chart data={sampleData} />
        <div >
            <PlayGameButton onClick={() => history.push('/game')} />
            <div>Table of recent due dates</div>
        </div>
    </Fragment>
)

export default contain(DashboardScene, { background:"#ddd", color:"#222" })